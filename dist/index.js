(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue-i18n'), require('js-cookie')) :
  typeof define === 'function' && define.amd ? define(['vue-i18n', 'js-cookie'], factory) :
  (global = global || self, global.SongPackage = factory(global.Vuei18n, global.Cookies));
}(this, function (Vuei18n, Cookies) { 'use strict';

  Vuei18n = Vuei18n && Vuei18n.hasOwnProperty('default') ? Vuei18n['default'] : Vuei18n;
  Cookies = Cookies && Cookies.hasOwnProperty('default') ? Cookies['default'] : Cookies;

  /**
   * 1、配置options自动加载locales文件，支持原有options
   * 2、setLocale()函数一键更换，
   * 3、当前语言缓存cookie
   * 4、data中的多语言支持响应式改变
   */

  let messages = {};

  // 获取所有语言包
  function getLocales(files) {
    files.keys().forEach(key => {
      const name = key.slice(2, -3);
      const locale = files(key).default;
      messages[name] = locale;
    });
  }

  function VueI18nStorge(options) {
    let locale = Cookies.get('locale');
    if (!locale) {
      locale = options.default;
      Cookies.set('locale', locale);
    }
    const files = options.files;
    getLocales(files); // 获取语言包

    delete options.files;
    delete options.default;

    let params = Object.assign({ locale, messages }, options);

    let i18n = new Vuei18n(params);

    i18n.setLocale = function (locale) {
      Cookies.set('locale', locale);
      window.location.reload();
    };

    i18n.getLocale = function () {
      return i18n.locale;
    };

    // 热更新
    if (module.hot) {
      module.hot.accept(files.keys(), function () {
        files.keys().forEach(key => {
          const name = key.slice(2, -3);
          const locale = files(key).default;
          i18n.setLocaleMessage(name, locale);
        });
      });
    }
    return i18n;
  }

  VueI18nStorge.install = Vuei18n.install;

  return VueI18nStorge;

}));
