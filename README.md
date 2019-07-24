# vue-router-dispense

一个基于 vue-i18n 的扩展， vue-i18n 原有功能及配置完全保留，主要功能有以下几点：

1. 指定语言包配置模块，统一加载，无需单个 import 进来
2. 当前语言缓存cookie
3. 提供setLocale()和getlLocale()函数

#### 安装

```
npm install vue-i18n-storge -S
```

#### 使用

```
import Vue from 'vue'
import VueI18nObServer from '../libs/vue-i18n-observer'

Vue.use(VueI18nObServer)

const i18n = new VueI18nObServer({
  default: 'zh-CN',
  files: require.context('../locales', true, /\.js$/)
})

export default i18n
```

##### default 

指定默认的语言

##### files

语言包的路径

##### 使用 i18n.locale = 'en-US' 和 i18n.setLocale('en-US') 的区别

i18n.setLocale 会缓存到 cookie ，并且会刷新页面

i18n.locale = 'en-US' 不会缓存到 cookie，不会刷新页面
