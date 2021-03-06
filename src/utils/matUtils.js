/**
 * Encontrar un promedio dado un numero natural
 * @param {number} x - numero natural
 * @returns number
 */
function mean(x) {
  return x.reduce((accum, curr) => accum + curr) / x.length
}

function myRound(x, n) {
  const mag = 10 ** n
  return Math.round(x * mag) / mag
}

// Se supone que se está realizando una buena entrada en las funciones matriciales.
function matTrace(a) {
  let traceTotal = 0
  for (let i = 0; i < a.length; i++) traceTotal += a[i][i]

  return traceTotal
}

function determinant2by2(a) {
  return a[0][0] * a[1][1] - a[0][1] * a[1][0]
}

function matMul(a, b) {
  const aNRows = a.length
  const aNCols = a[0].length
  const bNCols = b[0].length

  const output = new Array(aNRows)

  for (let r = 0; r < aNRows; r += 1) {
    output[r] = new Array(bNCols)
    for (let c = 0; c < bNCols; c += 1) {
      output[r][c] = 0
      for (let i = 0; i < aNCols; i += 1) {
        output[r][c] += a[r][i] * b[i][c]
      }
    }
  }

  return output
}

/**
 * PASO 1: ESTANDARIZACIÓN
 * Funcion para encontrar la covarianza de dos matrices
 * @param {Array<number>} x - arreglos de numero del eje x
 * @param {Array<number>} y - arreglo de numeros del eye y
 * @returns Array<number>
 */
function covariance(x, y) {
  const xMean = mean(x)
  const yMean = mean(y)

  let numerator = 0
  for (let i = 0; i < x.length; i++) {
    numerator += (x[i] - xMean) * (y[i] - yMean)
  }

  return numerator / (y.length - 1)
}

/* PASO 2: CÁLCULO DE LA MATRIZ DE COVARIANZA */
function covarianceMatrix2d(X) {
  const x = X.map((row) => row[0])
  const y = X.map((row) => row[1])

  const covXX = covariance(x, x)
  const covYY = covariance(y, y)
  let covXY = covariance(x, y)

  // Convierta -0 en 0 (solo realmente me importa el off diag)
  if (abs(covXY) < 0.005) {
    covXY = 0.0
  }

  return [
    [covXX, covXY],
    [covXY, covYY],
  ]
}

/**
 * Funcion para obtener "valores propios"
 * @param {Array<number>} a - arreglo de numeros naturales
 * @returns Array<number>
 */
function eigenvalues2by2(a) {
  const trA = matTrace(a)
  const detA = determinant2by2(a)

  const quadraticPart2 = sqrt(trA ** 2 - 4 * detA)
  const root1 = (trA + quadraticPart2) / 2
  const root2 = (trA - quadraticPart2) / 2

  // ordena de forma ascendente
  const roots = [root1, root2].sort((x, y) => abs(y) - abs(x))

  return roots
}

function eigenvectors2by2(m, eigenvalues) {
  const prec = 8

  const a = myRound(m[0][0], prec)
  const b = myRound(m[0][1], prec)
  const c = myRound(m[1][0], prec)
  const d = myRound(m[1][1], prec)

  const l1 = eigenvalues[0]
  const l2 = eigenvalues[1]

  let ev1
  let ev2
  if (c !== 0) {
    ev1 = [l1 - d, c]
    ev2 = [l2 - d, c]
  } else if (b !== 0) {
    ev1 = [b, l1 - a]
    ev2 = [b, l2 - a]
  } else {
    ev1 = [1, 0]
    ev2 = [0, 1]
  }

  if (ev1[0] < 0) {
    ev1[0] *= -1
    ev1[1] *= -1
  }

  if (ev2[1] < 0) {
    ev2[0] *= -1
    ev2[1] *= -1
  }

  // normalizar
  const ev1Mag = dist(0, 0, ev1[0], ev1[1])
  const ev2Mag = dist(0, 0, ev2[0], ev2[1])

  return [
    [ev1[0] / ev1Mag, ev1[1] / ev1Mag],
    [ev2[0] / ev2Mag, ev2[1] / ev2Mag],
  ]
}

export default {
  matMul,
  covarianceMatrix2d,
  eigenvalues2by2,
  eigenvectors2by2,
}
