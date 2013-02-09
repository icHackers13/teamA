(function() {
  var draw_chart, process_stats, refresh_data;

  refresh_data = function() {
    return $.getJSON($('#stats-link').val(), function(data) {
      if (data.api_error != null) {
        $('#github-api-error-message').show();
        return $('.github-api-stats').hide();
      } else {
        $('#github-api-error-message').hide();
        $('.github-api-stats').show();
        return process_stats(data);
      }
    }).error(function() {
      $('#system-error').show();
      $('.github-api-stats').hide();
      return setTimeout(function() {
        return refresh_data();
      }, 15 * 1000);
    });
  };

  process_stats = function(data) {
    var timed_stats;
    timed_stats = data.timed_stats;
    $("#stat-total-participants").html(data.total_participants);
    $("#stat-average-team-size").html(data.average_team_size);
    return draw_chart(timed_stats);
  };

  draw_chart = function(timed_stats) {
    var chart, commit_averages, commit_totals, hours, k, message_length_averages, swearword_count_averages, swearword_count_totals, v;
    hours = ((function() {
      var _results;
      _results = [];
      for (k in timed_stats) {
        v = timed_stats[k];
        _results.push(moment(k).format('MMM Do, ha'));
      }
      return _results;
    })()).reverse();
    commit_totals = ((function() {
      var _results;
      _results = [];
      for (k in timed_stats) {
        v = timed_stats[k];
        _results.push(v.total_commits);
      }
      return _results;
    })()).reverse();
    commit_averages = ((function() {
      var _results;
      _results = [];
      for (k in timed_stats) {
        v = timed_stats[k];
        _results.push(v.average_commits);
      }
      return _results;
    })()).reverse();
    message_length_averages = ((function() {
      var _results;
      _results = [];
      for (k in timed_stats) {
        v = timed_stats[k];
        _results.push(v.average_message_length);
      }
      return _results;
    })()).reverse();
    swearword_count_totals = ((function() {
      var _results;
      _results = [];
      for (k in timed_stats) {
        v = timed_stats[k];
        _results.push(v.total_swearword_count);
      }
      return _results;
    })()).reverse();
    swearword_count_averages = ((function() {
      var _results;
      _results = [];
      for (k in timed_stats) {
        v = timed_stats[k];
        _results.push(v.average_total_swearword_count);
      }
      return _results;
    })()).reverse();
    return chart = new Highcharts.Chart({
      chart: {
        renderTo: "stats",
        type: "line",
        margin: [40, 10, 120, 10],
        height: 300
      },
      title: {
        text: "Live Hackathon Repository Stats",
        x: -20
      },
      xAxis: {
        title: {
          text: ""
        },
        categories: hours,
        labels: {
          align: "right",
          rotation: -45
        }
      },
      yAxis: [
        {
          title: "",
          min: 0,
          labels: {
            enabled: false
          }
        }, {
          title: "",
          min: 0,
          labels: {
            enabled: false
          }
        }, {
          title: "",
          min: 0,
          labels: {
            enabled: false
          }
        }
      ],
      tooltip: {
        formatter: function() {
          return "<b>" + this.series.name + " during " + this.x + "</b><br/>" + this.y;
        }
      },
      legend: {
        y: 0
      },
      series: [
        {
          name: "Total Commits",
          data: commit_totals,
          yAxis: 0
        }, {
          name: "Per-Hack Commits",
          data: commit_averages,
          yAxis: 0
        }, {
          name: "Message Length (Avg)",
          data: message_length_averages,
          yAxis: 1
        }, {
          name: "Commit Message Swearwords",
          data: swearword_count_totals,
          yAxis: 2
        }
      ]
    });
  };

  $(document).ready(function() {
    var hostname;
    hostname = window.location.hostname;
    $("a[href^=http]").not("a[href*='" + hostname + "']").addClass("link external").attr("target", "_blank");
    $("[rel='tooltip']").tooltip();
    $(".btn.disabled").live("click", function(e) {
      return e.preventDefault();
    });
    $('.btn-delete').bind('click', function(e) {
      var answer;
      e.preventDefault();
      answer = confirm("Are you sure?");
      if (answer) {
        return $.ajax({
          type: "DELETE",
          url: $(this).attr('href')
        }).success(function() {
          return window.location.reload();
        });
      }
    });
    if ($('#stats').length > 0) {
      refresh_data();
      return setTimeout(function() {
        return refresh_data();
      }, 60 * 10 * 1000);
    }
  });

}).call(this);
