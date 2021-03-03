import React, { useEffect, useRef } from 'react'
import Tweakpane from 'tweakpane'
import CONFIG from '../../config/cuboid'

const Cuboid = ({ id, configDock, onRemove }) => {
  const cuboidRef = useRef(null)
  const paramsRef = useRef({ ...CONFIG, hue: Math.random() * 360, name: id })
  const paneRef = useRef(null)
  const update = () => {
    paneRef.current.element.querySelector(
      '.tp-rotv_t'
    ).innerHTML = `${paramsRef.current.name}<div class="tp-rotv_m"></div>`
    for (const KEY of Object.keys(paramsRef.current)) {
      cuboidRef.current.style.setProperty(`--${KEY}`, paramsRef.current[KEY])
    }
  }
  const dispose = () => {
    paneRef.current.dispose()
    onRemove(id)
  }
  useEffect(() => {
    if (configDock.current && cuboidRef.current && !paneRef.current) {
      paneRef.current = new Tweakpane({
        container: configDock.current,
        title: id,
        expanded: false,
      })
      paneRef.current.addInput(paramsRef.current, 'name', {
        label: 'Name',
      })
      const COLOR = paneRef.current.addFolder({
        title: 'Color',
        expanded: false,
      })
      COLOR.addInput(paramsRef.current, 'hue', {
        label: 'Hue',
        min: 0,
        max: 360,
        step: 1,
      })
      COLOR.addInput(paramsRef.current, 'saturation', {
        label: 'Saturation',
        min: 0,
        max: 100,
        step: 1,
      })
      COLOR.addInput(paramsRef.current, 'lightness', {
        label: 'Lightness',
        min: 0,
        max: 100,
        step: 1,
      })
      const BORDER = paneRef.current.addFolder({
        title: 'Panel Border',
        expanded: false,
      })
      BORDER.addInput(paramsRef.current, 'borderWidth', {
        label: 'Width',
        min: 0,
        max: 10,
        step: 1,
      })
      BORDER.addInput(paramsRef.current, 'borderColor', {
        label: 'Color',
      })
      const ROTATION = paneRef.current.addFolder({
        title: 'Rotation',
        expanded: false,
      })
      ROTATION.addInput(paramsRef.current, 'rotateX', {
        label: 'X',
        min: -360,
        max: 360,
        step: 1,
      })
      ROTATION.addInput(paramsRef.current, 'rotateY', {
        label: 'Y',
        min: -360,
        max: 360,
        step: 1,
      })
      ROTATION.addInput(paramsRef.current, 'rotateZ', {
        label: 'Z',
        min: -360,
        max: 360,
        step: 1,
      })
      const POSITION = paneRef.current.addFolder({
        title: 'Position',
        expanded: false,
      })
      POSITION.addInput(paramsRef.current, 'x', {
        label: 'X',
        min: -100,
        max: 100,
        step: 1,
      })
      POSITION.addInput(paramsRef.current, 'y', {
        label: 'Y',
        min: -100,
        max: 100,
        step: 1,
      })
      POSITION.addInput(paramsRef.current, 'z', {
        label: 'Z',
        min: -100,
        max: 100,
        step: 1,
      })
      const DIMENSIONS = paneRef.current.addFolder({
        title: 'Dimensions',
        expanded: false,
      })
      DIMENSIONS.addInput(paramsRef.current, 'depth', {
        label: 'Depth',
        min: 1,
        max: 100,
        step: 1,
      })
      DIMENSIONS.addInput(paramsRef.current, 'height', {
        label: 'Height',
        min: 1,
        max: 100,
        step: 1,
      })
      DIMENSIONS.addInput(paramsRef.current, 'width', {
        label: 'Width',
        min: 1,
        max: 100,
        step: 1,
      })
      paneRef.current.on('change', update)
      const REMOVE = paneRef.current.addButton({ title: 'Remove' })
      REMOVE.on('click', dispose)
      update()
    }
  }, [])
  return (
    <div className={`cuboid cuboid--${id}`} ref={cuboidRef}>
      {new Array(6).fill().map((_, idx) => (
        <div key={`cuboid--${id}--side-${idx}`}></div>
      ))}
    </div>
  )
}

export default Cuboid
