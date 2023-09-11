const axios = require("axios");
const fs = require("fs");
const { Octokit } = require("@octokit/core");

// 使用 GitHub API 获取 PR 文件列表
async function getFilesInPR() {
  const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/pulls/${prNumber}/files`;

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
    } else {
      console.error("无法获取文件列表:", response.data.message);
    }
  } catch (error) {
    console.error("发生错误:", error.message);
  }
}

const Action = async payload => {
  const { repoName, owner, token, prNumber } = payload;
  console.log("payload", payload);
  await getFilesInPR({ owner, repoName, token, prNumber });
  console.log("action end");
};

module.exports = Action;
