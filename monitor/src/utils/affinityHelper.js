const calculateAffinityFactor = (m_x_y, totalM, d_x_y, totalD, w = 0.5) => {
    if (totalM !== 0 && totalD !== 0) {
        const AF_x_y = w * (m_x_y / totalM) + ((1 - w) * (d_x_y / totalD))

        return AF_x_y
    }

    if (totalM === 0 && totalD !== 0) {
        const AF_x_y = ((1 - w) * (d_x_y / totalD))

        return AF_x_y
    }

    if (totalM !== 0 && totalD === 0) {
        const AF_x_y = w * (m_x_y / totalM)

        return AF_x_y
    }

    if (totalM === 0 && totalD === 0) {
        return 0
    }
}

const calculateAffinityCost = (AF_x_y, L_x_y, Amp = 1.0) => {
    const AC_x_y = Amp * L_x_y * AF_x_y

    return AC_x_y
}

const calculateNetCost = (AC) => {
    const NC = AC.reduce((acc, cur) => acc + cur, 0);

    return NC
}

const calculateAverageAffinityCost = (AC) => {
    const AFC = AC.length !== 0 ? calculateNetCost(AC) / AC.length : 0

    return AFC
}

module.exports = { calculateAffinityFactor, calculateAffinityCost, calculateNetCost, calculateAverageAffinityCost };