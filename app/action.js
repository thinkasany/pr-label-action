const axios = require("axios");
const fs = require("fs");
const { Octokit } = require("@octokit/core");

// 使用 GitHub API 获取 PR 文件列表
const getFilesInPR = async payload => {
  const { repo, owner, token, prNumber } = payload;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`;

  console.log("apiUrl", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "GitHub-File-Types"
      }
    });

    if (response.status === 200) {
      const fileTypes = new Set();

      response.data.forEach(file => {
        const filePath = file.filename;
        const fileType = filePath.split(".").pop(); // 提取文件类型
        fileTypes.add(fileType);
      });

      console.log("PR 中的文件类型:", Array.from(fileTypes));
      return Array.from(fileTypes);
    } else {
      console.error("无法获取文件列表:", response.data.message);
    }
  } catch (error) {
    console.error("发生错误:", error.message);
  }
};

const addLabelToPR = async payload => {
  const { repo, owner, token, prNumber, files: labelList } = payload;
  console.log("addLabelToPR payload", payload);

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/labels`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Label-Adder"
  };
  console.log("addLabelToPR", apiUrl, labelList);

  axios
    .post(apiUrl, labelList, { headers })
    .then(response => {
      if (response.status === 200) {
        console.log(`成功为 PR ${prNumber} 添加标签: ${labelList.join(", ")}`);
      } else {
        console.error(`无法为 PR ${prNumber} 添加标签: ${response.data.message}`);
        console.log(response);
      }
    })
    .catch(error => {
      console.error(`发生错误: ${error.message}`);
    });
};

// 获取仓库的所有有权限的成员
const getAllCollaborators = async payload => {
  const { repo, owner, token } = payload;

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/collaborators`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Collaborators-List"
  };

  try {
    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      const collaborators = response.data.map(
        collaborator => collaborator.login
      );
      return collaborators;
    } else {
      console.error(`无法获取成员列表: ${response.data.message}`);
      return null;
    }
  } catch (error) {
    console.error(`发生错误: ${error.message}`);
    return null;
  }
};

const Action = async payload => {
  const { isEnableSuffix, teamLabel, isEnableTeamLabel } = payload;
  console.log("payload", payload);
  const files = await getFilesInPR(payload);
  console.log("files", files);
  const coreTeam = await getAllCollaborators(payload);
  console.log("coreTeam", coreTeam);

  if (isEnableTeamLabel) {
    // 是否开启功能：添加 teamLabel 的label
    await addLabelToPR({ ...payload, files: [teamLabel] });
  }

  if (isEnableSuffix) {
    // 是否开启功能： 为文件后缀添加label
    await addLabelToPR({ ...payload, files });
  }

  console.log("action end");
};

module.exports = Action;