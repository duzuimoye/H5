
        if (navigator.userAgent.indexOf('AlipayClient') > -1) {
          document.writeln(
            '<script src="https://appx/web-view.min.js"' +
              '>' +
              '<' +
              '/' +
              'script>'
          );
        } else if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
          document.writeln(
            '<script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"' +
              '>' +
              '<' +
              '/' +
              'script>'
          );
        }
  
        !(function(e, t, n, g, i) {
          (e[i] =
            e[i] ||
            function() {
              (e[i].q = e[i].q || []).push(arguments);
            }),
            (n = t.createElement('script')),
            (tag = t.getElementsByTagName('script')[0]),
            (n.async = 1),
            (n.src =
              ('https:' == document.location.protocol ? 'https://' : 'http://') +
              g),
            tag.parentNode.insertBefore(n, tag);
        })(window, document, 'script', 'assets.growingio.com/2.1/gio.js', 'gio');
        gio('init', 'a94e99cb7799a596', {});
        gio('send');
  
          document.documentElement.setAttribute(
            'style',
            'font-size:' + window.innerWidth / 3.75 / 2 + 'px'
          );
    
          function handleRouteToProductDetail(e) {
            var itemId = e.dataset.itemId;
            if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
              wx.miniProgram.getEnv(function(res) {
                if (res.miniprogram) {
                  wx.miniProgram.navigateTo({
                    url: '/pages/product/detail/detail?item_id=' + itemId
                  });
                } else {
                  window.location.href =
                    'https://m.zudeapp.com/detail/' + itemId + '?type=' + type;
                }
              });
            } else if (navigator.userAgent.indexOf('AlipayClient') > -1) {
              my.getEnv(function(res) {
                if (res.miniprogram) {
                  my.navigateTo({
                    url: '/pages/product/detail/detail?item_id=' + itemId
                  });
                } else {
                  window.location.href =
                    'https://m.zudeapp.com/detail/' + itemId + '?type=' + type;
                }
              });
            } else {
              window.location.href =
                'https://m.zudeapp.com/detail/' + itemId + '?type=' + type;
            }
          }
    
          function handleRouteToIndex() {
            if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
              wx.miniProgram.getEnv(function(res) {
                if (res.miniprogram) {
                  wx.miniProgram.switchTab({
                    url: '/pages/index/index'
                  });
                } else {
                  window.location.href = 'https://m.zudeapp.com?type=' + type;
                }
              });
            } else if (navigator.userAgent.indexOf('AlipayClient') > -1) {
              my.getEnv(function(res) {
                if (res.miniprogram) {
                  my.switchTab({
                    url: '/pages/index/index'
                  });
                } else {
                  window.location.href = 'https://m.zudeapp.com?type=' + type;
                }
              });
            } else {
              window.location.href = 'https://m.zudeapp.com?type=' + type;
            }
          }
    
          function jsonp(url, cb) {
            var name = 'jsonpkey';
            var script = document.createElement('script');
            script.src = url + '&callback=' + name;
            script.type = 'text/javascript';
            window[name] = function(data) {
              cb && cb(data);
            };
            document.body.appendChild(script);
            setTimeout(function() {
              document.body.removeChild(script);
            }, 0);
          }
    
          function handleCouponReceive(id, cb) {
            if (uid && uid !== 'undefined' && uid !== 'null') {
              jsonp(
                'https://m.zudeapp.com/weixinapi/activity/getCouponById.cgi?id=' +
                  id +
                  '&uid=' +
                  uid,
                function(res) {
                  if (res.err_code === -1) {
                    cb && cb('领取成功');
                  } else {
                    cb && cb(res.err_msg);
                  }
                }
              );
            } else {
              if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
                wx.miniProgram.getEnv(function(res) {
                  if (res.miniprogram) {
                    showToast('uid不能为空');
                  } else {
                    window.location.href =
                      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc8a4294fa5373ad0&redirect_uri=' +
                      ('https://m.zudeapp.com/wxCallback#wechat_redirect?response_type=code&scope=snsapi_userinfo&state=qichuang&return_url=https://res.zudeapp.com/activity/20181219/index.html?type=' +
                        type);
                  }
                });
              } else if (navigator.userAgent.indexOf('AlipayClient') > -1) {
                my.getEnv(function(res) {
                  if (res.miniprogram) {
                    showToast('uid不能为空');
                  } else {
                    window.location.href =
                      'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018072260811060&scope=auth_user,auth_base&redirect_uri=' +
                      ('https://m.zudeapp.com/alipayCallback?return_url=https://res.zudeapp.com/activity/20181219/index.html?type=' +
                        type);
                  }
                });
              } else {
                window.location.href =
                  'https://m.zudeapp.com/loginnew?type=' +
                  type +
                  '&callbackUrl=https://res.zudeapp.com/activity/20181219/index.html';
              }
            }
          }
    
          function showToast(content, timeout) {
            var toast = document.getElementById('modal_toast');
            document.getElementById('toast_text').innerText = content;
            toast.classList.remove('disabled');
            setTimeout(function() {
              toast.classList.add('disabled');
            }, timeout || 1500);
          }
    
          function couponsReceive() {
            handleCouponReceive('MK49BTQN0S07PS');
            handleCouponReceive('MK49B7ILZ1O7PS');
            handleCouponReceive('MK4A0T97SRGN5C');
            handleCouponReceive('MK49QYOVT807PS', function(content) {
              showToast(content);
            });
          }
    
          function keyFromUrl(key) {
            var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
            var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
            if (r != null) return unescape(r[2]);
            return '';
          }
    
          var type = keyFromUrl('type');
          var uid = keyFromUrl('uid');
          