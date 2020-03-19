import * as THREE from '../../libs/three.weapp'

// const {
//   renderModel
// } = require('../../models/robotModel')
// const {
//   renderModel
// } = require('../../models/tkfModel')
// const {
//   renderModel
// } = require('../../models/dlamModel')
// const {
//   renderModel
// } = require('../../models/fhModel')
const {
  renderModel
} = require('../../models/femaleModel')

const app = getApp()

Page({
  data: {},
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        // const canvas = res[0].node
        // const THREE = createScopedThreejs(canvas)
        const canvas = THREE.global.registerCanvas(res[0].node)
        renderModel(canvas, THREE)
      })
  },
  touchStart(e) {
    console.log('canvas touchStart', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e) {
    console.log('canvas touchMove', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e) {
    console.log('canvas touchEnd', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  }
})