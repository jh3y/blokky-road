import React, { useState, useEffect, useRef, Fragment } from 'react'
import { v4 as uuid } from 'uuid'
import Scene from './components/scene'
import Configurator from './components/configurator'
import Cuboid from './components/cuboid'

// The end goal is to export to HTML && CSS. Not have the
// finished article.

const App = () => {
  const [cuboids, setCuboids] = useState([])
  const [remove, setRemove] = useState(null)
  const configuratorRef = useRef(null)
  const showcaseMode = useRef(false)
  const addCuboid = () => {
    setCuboids([...cuboids, { __id: uuid() }])
  }
  const removeCuboid = id => {
    setRemove(id)
  }

  useEffect(() => {
    if (remove) {
      setCuboids(cuboids.filter(c => c.__id !== remove))
    }
  }, [remove])

  const showcase = () => {
    showcaseMode.current = !showcaseMode.current
    document.documentElement.style.setProperty(
      '--play-state',
      showcaseMode.current ? '6' : '0'
    )
  }
  return (
    <Fragment>
      <Configurator innerRef={configuratorRef} />
      <Scene configDock={configuratorRef}>
        {cuboids.map((cuboid) => (
          <Cuboid
            onRemove={removeCuboid}
            configDock={configuratorRef}
            key={cuboid.__id}
            id={cuboid.__id}
          />
        ))}
      </Scene>
      <div className="controls">
        <button className="showcase" onClick={showcase}>
          <svg viewBox="0 0 512 512" width="100" title="magic">
            <path d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z" />
          </svg>
        </button>
        <button className="add-cuboid" onClick={addCuboid}>
          <svg viewBox="0 0 512 512" width="100" title="cubes">
            <path d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z" />
          </svg>
        </button>
      </div>
    </Fragment>
  )
}

export default App
