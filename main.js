const Action = require("./app/action");
const log = require("./app/log");
const core = require("@actions/core");
const github = require("@actions/github");

(async function() {
  try {
    // 获取输入
    const context = github.context;
    const owner = context.repo.owner;
    const repoName = context.repo.repo;
    const token = core.getInput("github_token", { required: true });
    const prNumber = core.getInput("pr_number", { required: true });
    
    log.info(`repoName: ${repoName}; owner:${owner}; prNumber: ${prNumber}`);
    const payload = {
      repo: repoName,
      owner,
      token,
      prNumber
    };
    await Action(payload);
    log.info("organize-contributors Action 成功结束运行！", orgName);
  } catch (error) {
    log.setFailed("错误：", error);
  }
})();
