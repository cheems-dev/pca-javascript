import displayUtils from '../utils/displayUtils.js'
import plotUtils from '../utils/plotUtils.js'

export default function projectedDataStep({ projectedData, palette }) {
  displayUtils.labelStep("Datos graficados sobre\n'Ejes Principales'")
  plotUtils.drawAxes()
  plotUtils.plot2d(projectedData, palette)
}
