import React, { useEffect, useRef } from 'react'
import Tweakpane from 'tweakpane'
import CONFIG from '../../config/scene'

const Scene = ({ children, configDock }) => {
  const sceneRef = useRef(null)
  const paneRef = useRef(null)
  const paramsRef = useRef({ ...CONFIG })

  const resetRotation = () => {
    // Trick to reset is to import reset state.
    const RESET = {
      ...paramsRef.current,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    }
    paneRef.current.importPreset(RESET)
  }
  const resetPosition = () => {
    // Trick to reset is to import reset state.
    const RESET = {
      ...paramsRef.current,
      x: 0,
      y: 0,
      z: 0,
    }
    paneRef.current.importPreset(RESET)
  }

  useEffect(() => {
    if (configDock.current && !paneRef.current) {
      paneRef.current = new Tweakpane({
        container: configDock.current,
        title: 'Scene',
        expanded: false,
      })
      const COLOR = paneRef.current.addFolder({
        title: 'Background',
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
      const RESET_POSITION = POSITION.addButton({ title: 'Reset' })
      RESET_POSITION.on('click', resetPosition)
      const ROTATE = paneRef.current.addFolder({
        title: 'Rotation',
        expanded: false,
      })
      ROTATE.addInput(paramsRef.current, 'rotateX', {
        label: 'X',
        min: -360,
        max: 360,
        step: 1,
      })
      ROTATE.addInput(paramsRef.current, 'rotateY', {
        label: 'Y',
        min: -360,
        max: 360,
        step: 1,
      })
      ROTATE.addInput(paramsRef.current, 'rotateZ', {
        label: 'Z',
        min: -360,
        max: 360,
        step: 1,
      })
      const RESET_ROTATE = ROTATE.addButton({ title: 'Reset' })
      RESET_ROTATE.on('click', resetRotation)
      // const DIMENSIONS = paneRef.current.addFolder({
      //   title: 'Dimensions',
      //   expanded: false,
      // })
      // DIMENSIONS.addInput(paramsRef.current, 'width', {
      //   label: 'Width',
      //   min: 10,
      //   max: 100,
      //   step: 1,
      // })
      // DIMENSIONS.addInput(paramsRef.current, 'depth', {
      //   label: 'Depth',
      //   min: 10,
      //   max: 100,
      //   step: 1,
      // })
      // DIMENSIONS.addInput(paramsRef.current, 'height', {
      //   label: 'Height',
      //   min: 10,
      //   max: 100,
      //   step: 1,
      // })
      paneRef.current.addInput(paramsRef.current, 'zoom', {
        label: 'Zoom',
        min: -1,
        max: 5,
        step: 0.1,
      })
      paneRef.current.addInput(paramsRef.current, 'coefficient', {
        label: 'Coefficient (px)',
        min: 1,
        max: 50,
        step: 1,
      })

      paneRef.current.on('change', (ev) => {
        const EXCLUDED = ['hue', 'saturation', 'lightness', 'coefficient']
        for (const KEY of Object.keys(paramsRef.current).filter(
          (key) => EXCLUDED.indexOf(key) === -1
        )) {
          sceneRef.current.style.setProperty(`--${KEY}`, paramsRef.current[KEY])
        }
        for (const KEY of EXCLUDED) {
          document.documentElement.style.setProperty(
            `--${KEY}`,
            paramsRef.current[KEY]
          )
        }
      })
    }
  }, [])
  return (
    <div className="scene__wrapper" ref={sceneRef}>
      <div className="scene">{children}</div>
    </div>
  )
}

export default Scene
