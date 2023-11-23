const Container = require("../sdhw-persisted/Container")

// const { getContainerData, getContainerList, startContainer, stopContainer, removeContainer } = require("../sdhw/runner")

// Container
exports.getContainer = async (req, res) => {
    const data = await Container.getContainer(req.params['machineName'], req.params['containerName'])

    res.status(200).json({ containerData: data });
}

exports.getContainerList = async (req, res) => {
    const data = await Container.getContainerList(req.params['machineName'])

    res.status(200).json({ containerList: data });
}



exports.startContainer = async (req, res) => {
    const data = await Container.startContainer(req.params["machineName"], req.body)

    res.status(200).json({ container: data });
}

// exports.stopContainer = async (req, res) => {
//     const data = stopContainer(req.params['machineName'], req.params['containerName'])

//     if(data){
//         res.status(200).json({ stoppedContainer: data, message: "Container stopped successfully" });
//     } else {
//         res.status(404).json({ message: "Container stopping failed" });
//     }
// }

// exports.removeContainer = async (req, res) => {
//     const data = removeContainer(req.params['machineName'], req.params['containerName'])

//     if(data){
//         res.status(200).json({ isRemoved: data, message: "Container removed successfully" });
//     } else {
//         res.status(404).json({ message: "Container removing failed" });
//     }
// }