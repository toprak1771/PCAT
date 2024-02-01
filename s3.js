const S3 = require("aws-sdk/clients/s3");
const fs = require('fs');

require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey=process.env.AWS_SECRET_ACCESS_KEY;

const s3= new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams= {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.fileName,
    }
    return s3.upload(uploadParams).promise();
}

function getFile(fileKey) {
    console.log("geldi")
    const downloadParams = {
        Bucket:bucketName,
        Key:fileKey,
    }
    console.log("downloadParams:",downloadParams)
    //const command = s3.getObject(downloadParams).createReadStream();
    //console.log("command:",command);
    // const seconds = 60;
    // console.log("seconds:",seconds);
    const url =  s3.getSignedUrl('getObject',downloadParams);
    //console.log("url17:",url);
    return url;
}

module.exports = { uploadFile,getFile };