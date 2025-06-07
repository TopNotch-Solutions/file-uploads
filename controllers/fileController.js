const File = require("../models/file");

exports.create = async (req, res) => {
    const {fileType} = req.body;
   const myFile = req.file ? req.file.filename : null;

     if (
      fileType === "" ||
      myFile === ""
    ) {
     return res.status(400).json({
        status: "FAILURE",
        message: "Empty input fields",
      });
    }
     try{
        const existingFile = await File.findOne({
        where: {
          filePath: myFile,
        },
      });
       if (existingFile) {
       return res.status(409).json({
          status: "FAILURE",
          message: "file already exist!",
          data: existingFile,
        });
    }
    await File.create({
          fileType,
          filePath: myFile,
        });

    return res.status(201).json({
            status: "SUCCESS",
            message: "File successfully created!",
          });
     }catch(error){
       return res.status(500).json({
      status: "FAILURE",
      message: "Internal server error: " + error.message,
    });
     }
}
exports.all = async (req, res) => {
    try{
       const files = await File.findAll();
    if (files) {
    return  res.status(201).json({
        status: "SUCCESS",
        message: "files successfully created!",
        data: files,
      }); 
    }
    return res.status(500).json({
        status: "FAILURE",
        message: "Internal server error.",
      });
    }catch(error){
         return res.status(500).json({
      status: "FAILURE",
      message: "Internal server error: " + error.message,
    });
    }
}
exports.single = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({
        status: "FAILURE",
        message: "Empty parameter",
      });
    } else {
      const bso = await File.findOne({
        where: {
          id,
        },
      });

      if (bso) {
        res.status(200).json({
          status: "SUCCESS",
          message: "file successfully retrieved!",
          data: bso,
        });
      } else {
        res.status(500).json({
          status: "FAILURE",
          message: "Internal server error.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "FAILURE",
      message: "Internal server error: " + error.message,
    });
  }
};