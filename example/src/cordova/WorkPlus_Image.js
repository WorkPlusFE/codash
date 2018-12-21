import wp from '../shared/cordova';

const hook = 'WorkPlus_Image';
const hookInstance = wp.addHook(hook);

const WorkPlus_Image = [{
  title: '拍照返回',
  page: 'base',
  tips: '拍照，压缩图片后直接返回图片',
  options: {
    action: 'takePhoto',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '拍照返回并且可编辑',
  page: 'base',
  tips: '拍照，截图返回',
  options: {
    action: 'takePhotoWithEdit',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '选择图片（单张）',
  page: 'base',
  tips: '调用图片相册，选择图片并压缩返回',
  options: {
    action: 'selectImage',
    params: [],
    hook,
    hookInstance,
  },
},{
  title: '选择图片并截图返回（单张）',
  page: 'base',
  tips: '调用图片相册，选择图片并截取返回',
  options: {
    action: 'selectImageWithEdit',
    params: [],
    hook,
    hookInstance,
  },
},{
  title: '选择多张图片',
  page: 'base',
  tips: '调用图片相册，选择多张图片并压缩返回，并且支持选过图片的传输，[{"imageKeys":["图片在本机的地址", "xxx",...]}]',
  options: {
    action: 'selectImages',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '清除压缩后的图片',
  page: 'base',
  tips: '拍照或选择照片后都会生成压缩图片，调用这个方法去清除',
  options: {
    action: 'cleanCompressImage',
    params: [],
    hook,
    hookInstance,
  },
}, {
  title: '批量预览图片',
  page: 'base',
  tips: '传输图片地址，预览图片',
  options: {
    action: 'showImages',
    params: [{ urls: ["https://workplus.io/images/aboutme01.png", "https://workplus.io/images/aboutme02.png", "https://workplus.io/images/aboutme03.png"]}],
    hook,
    hookInstance,
  },
}, {
  title: '保存图片',
  page: 'base',
  tips: '传输图片地址，保存图片。支持存入url和mediaId',
  options: {
    action: 'saveImages',
    params: [{ url: "https://workplus.io/images/aboutme03.png" }],
    hook,
    hookInstance,
  },
}, {
  title: '长按图片弹出框 *',
  page: 'base',
  tips: '弹出框包括"识别二维码", "保存图片"等选项，需要传入base64。',
  options: {
    action: 'actionForLongPressImage',
    params: [{ imageData: '' }],
    hook,
    hookInstance,
  },
}, {
  title: '拍照返回接口(带mediaId)',
  page: 'base',
  tips: '新增接口，拍照返回，根据传入参数决定是否可以进行裁剪编辑, 同时会将图片上传后台，返回mediaId。[此新增接口，workplus版本必须为3.1.3 之后可用]',
  options: {
    action: 'takePicture',
    params: [{ editable: true }],
    hook,
    hookInstance,
  },
}, {
  title: '选择图片接口(带mediaId)',
  page: 'base',
  tips: `调用图片相册，根据用户参数决定是否选择多张图片或单张图片，支持编辑剪裁(编辑剪裁功能仅仅限于单张图片功能),并且支持选过图片的传输,选择完后会进行后台上传，返回值中带有上传后的mediaId。
        multiple : 是否是多选，ture(多选)  fals(单选)
        editable : 是否对图像进行剪裁 true(剪裁)  false(不剪裁) 
        注意: editable 为true剪裁方式仅对于单选图片情况下生效，即multiple = false
        imageKeys : 可以传送之前选过的图片
    `,
  options: {
    action: 'chooseImages',
    params: [{ multiple: true, editable: true }],
    hook,
    hookInstance,
  },
}, {
  title: '图片添加水印',
  page: 'base',
  tips: `拍照，生成水印图片返回；Workplus 3.6.0版本以上使用。`,
  options: {
    action: 'takePhotoAndAddWaterMark',
    params: [{
      "content": "我是xxx",
      "font_size": "14",
      "color": "#FF5858"
    }],
    hook,
    hookInstance,
  },
}];

export default WorkPlus_Image;