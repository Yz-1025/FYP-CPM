export function languageLinks(currentLocale) {
  if (currentLocale === 'en') {
    return [
      { locale: 'zh', label: '繁體中文 (Traditional Chinese)' },
      { locale: 'sc', label: '簡體中文 (Simplified Chinese)' },
      { locale: 'en', label: 'English' },
    ]
  }
  if (currentLocale === 'sc') {
    return [
      { locale: 'zh', label: '繁体中文' },
      { locale: 'sc', label: '简体中文' },
      { locale: 'en', label: '英文' },
    ]
  }
  return [
    { locale: 'zh', label: '繁體中文' },
    { locale: 'sc', label: '簡體中文' },
    { locale: 'en', label: '英文' },
  ]
}

export function siteTitle(locale) {
  if (locale === 'en') return 'Hong Kong Chinese Patent Medicine Database'
  if (locale === 'sc') return '香港中成药数据库'
  return '香港中成藥資料庫'
}

export function uiCopy(locale) {
  if (locale === 'en') {
    return {
      searchBtn: 'Search medicines',
      homeTitle: siteTitle('en'),
      homeLead: 'Browse registered products from the official Hong Kong registry.',
      searchTitle: 'Search',
      searchLead: 'Search by product name, registration number, or trademark.',
      searchPlaceholder: 'Enter keywords…',
      searchAction: 'Search',
      loading: 'Loading…',
      notFound: 'Product not found.',
      noImage: 'No image',
      noData: 'Not available',
      backHome: 'Back to list',
      fields: {
        name: 'Name',
        pcmNo: 'Registration no.',
        dosageForm: 'Dosage form',
        ingredients: 'Ingredients',
        manufacturer: 'Manufacturer',
        regHolder: 'Registration holder',
        packings: 'Packaging',
        efficacy: 'Efficacy',
        contraindications: 'Contraindications',
        precautions: 'Precautions',
        images: 'Images',
      },
      footer: {
        warm: 'Important notice',
        disclaimer:
          'Data on this platform is sourced from the Hong Kong Government / Chinese Medicine Council of Hong Kong official registry and other labelled sources. This platform does not sell or supply medicines. Information is for reference only and does not constitute medical advice. Please consult a qualified professional before use.',
      },
      pagerPrev: 'Previous',
      pagerNext: 'Next',
      pagerInfo: (page, total) => `Page ${page} · ${total} items`,
    }
  }
  if (locale === 'sc') {
    return {
      searchBtn: '搜索药物',
      homeTitle: siteTitle('sc'),
      homeLead: '浏览香港官方登记的中成药资料。',
      searchTitle: '搜索',
      searchLead: '可按产品名称、注册编号或商标搜索。',
      searchPlaceholder: '输入关键字…',
      searchAction: '搜索',
      loading: '加载中…',
      notFound: '找不到该产品。',
      noImage: '没有图片',
      noData: '暂无资料',
      backHome: '返回列表',
      fields: {
        name: '名称',
        pcmNo: '注册编号',
        dosageForm: '剂型',
        ingredients: '成分',
        manufacturer: '制造商',
        regHolder: '注册持有人',
        packings: '包装规格',
        efficacy: '药效',
        contraindications: '禁忌症',
        precautions: '注意事项',
        images: '图片',
      },
      footer: {
        warm: '温馨提示',
        disclaimer:
          '本平台资料来自香港政府／香港中医药管理委员会官方登记及其他注明来源，本平台不参与销售及供应，仅供参考，不构成医疗建议。用药前请咨询合资格专业人士。',
      },
      pagerPrev: '上一页',
      pagerNext: '下一页',
      pagerInfo: (page, total) => `第 ${page} 页 · 共 ${total} 条`,
    }
  }
  return {
    searchBtn: '搜尋藥物',
    homeTitle: siteTitle('zh'),
    homeLead: '瀏覽香港官方登記的中成藥資料。',
    searchTitle: '搜尋',
    searchLead: '可按產品名稱、註冊編號或商標搜尋。',
    searchPlaceholder: '輸入關鍵字…',
    searchAction: '搜尋',
    loading: '載入中…',
    notFound: '找不到該產品。',
    noImage: '沒有圖片',
    noData: '暫無資料',
    backHome: '返回列表',
    fields: {
      name: '名稱',
      pcmNo: '註冊編號',
      dosageForm: '劑型',
      ingredients: '成分',
      manufacturer: '製造商',
      regHolder: '註冊持有人',
      packings: '包裝規格',
      efficacy: '藥效',
      contraindications: '禁忌症',
      precautions: '注意事項',
      images: '圖片',
    },
    footer: {
      warm: '溫馨提示',
      disclaimer:
        '本平台資料來自香港政府／香港中醫藥管理委員會官方登記及其他註明來源，本平台不參與銷售及供應，僅供參考，不構成醫療建議。用藥前請諮詢合資格專業人士。',
    },
    pagerPrev: '上一頁',
    pagerNext: '下一頁',
    pagerInfo: (page, total) => `第 ${page} 頁 · 共 ${total} 條`,
  }
}
