interface Browser {
  versions: {
    trident: boolean
    presto: boolean
    webKit: boolean
    gecko: boolean
    mobile: boolean
    ios: boolean
    android: boolean
    iPhone: boolean
    iPad: boolean
    webApp: boolean
  }
  language: string
}

/**
 * 浏览器环境检测工具
 * 用于检测当前浏览器环境、设备类型等信息
 */
export const getBrowser = (): Browser => {
  return {
    versions: (() => {
      const u = navigator.userAgent
      return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') == -1
      }
    })(),
    language: navigator.language.toLowerCase()
  }
}

/**
 * 检查是否为iOS设备
 */
export const isIOS = (): boolean => {
  const browser = getBrowser()
  return browser.versions.mobile && browser.versions.ios
}

/**
 * 检查是否为Android设备
 */
export const isAndroid = (): boolean => {
  const browser = getBrowser()
  return browser.versions.android
}

/**
 * 检查是否为微信环境
 */
export const isWechat = (): boolean => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') !== -1
}