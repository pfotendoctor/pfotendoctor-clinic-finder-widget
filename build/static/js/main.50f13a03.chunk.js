(this['webpackJsonpreddit-widget'] =
  this['webpackJsonpreddit-widget'] || []).push([
  [0],
  {
    10: function (e, t, r) {
      'use strict';
      r.r(t);
      var a = r(0),
        n = r.n(a),
        c = r(3),
        d = r.n(c),
        i = r(1);
      r(9);
      function o(e) {
        var t = e.data,
          r = t.title,
          a = t.url,
          c = t.author,
          d = t.id,
          i = 'https://www.reddit.com/u/'.concat(c);
        return n.a.createElement(
          'div',
          { className: 'reddit_widget__post', key: d },
          n.a.createElement(
            'div',
            { className: 'reddit_widget__posted_by' },
            'posted by ',
            n.a.createElement(
              'a',
              {
                href: i,
                className: 'reddit_widget__posted_by',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              'u/',
              c,
            ),
          ),
          n.a.createElement(
            'a',
            {
              href: a,
              className: 'reddit_widget__title',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            r,
          ),
        );
      }
      function s(e) {
        return !e.data.stickied;
      }
      var l = function (e) {
        var t = e.domElement.getAttribute('data-subreddit'),
          r = Object(a.useState)(),
          c = Object(i.a)(r, 2),
          d = c[0],
          l = c[1],
          m = Object(a.useState)(''),
          _ = Object(i.a)(m, 2),
          u = _[0],
          p = _[1],
          f = Object(a.useState)([]),
          h = Object(i.a)(f, 2),
          w = h[0],
          g = h[1];
        return (
          Object(a.useEffect)(
            function () {
              l(!0),
                fetch('https://www.reddit.com/r/'.concat(t, '.json'))
                  .then(function (e) {
                    return e.json();
                  })
                  .then(function (e) {
                    l(!1), g(e.data.children.slice(0, 10));
                  })
                  .catch(function (e) {
                    console.log(e), l(!1), p('error fetching from reddit');
                  });
            },
            [t],
          ),
          n.a.createElement(
            'div',
            { className: 'reddit_widget__app' },
            n.a.createElement(
              'h1',
              { className: 'reddit_widget__header' },
              'Latest posts in ',
              n.a.createElement(
                'a',
                {
                  href: 'https://reddit.com/r/'.concat(t),
                  rel: 'noopener noreferrer',
                },
                '/r/',
                t,
              ),
            ),
            n.a.createElement(
              'div',
              { className: 'reddit_widget__inner' },
              d && 'Loading...',
              u && u,
              !!w.length && w.filter(s).map(o),
            ),
            n.a.createElement(
              'p',
              { className: 'reddit_widget__powered_by' },
              'This widget is powered by',
              ' ',
              n.a.createElement(
                'a',
                {
                  href: 'https://javascriptpros.com',
                  rel: 'noopener noreferrer',
                  target: '_blank',
                },
                'JavaScriptPros.com',
              ),
            ),
          )
        );
      };
      document.querySelectorAll('.reddit_widget').forEach(function (e) {
        d.a.render(
          n.a.createElement(
            n.a.StrictMode,
            null,
            n.a.createElement(l, { domElement: e }),
          ),
          e,
        );
      });
    },
    4: function (e, t, r) {
      e.exports = r(10);
    },
    9: function (e, t, r) {},
  },
  [[4, 1, 2]],
]);
//# sourceMappingURL=main.50f13a03.chunk.js.map
