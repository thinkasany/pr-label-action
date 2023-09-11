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
    const isEnableSuffix = core.getInput("enable_suffix") || true
    const isEnableTeamLabel = core.getInput("enable_suffix") || "Core Team"
    const teamLabel = core.getInput("team_label") || "Core Team"
    
    log.info(`repoName: ${repoName}; owner:${owner}; prNumber: ${prNumber}; isEnableSuffix: ${isEnableSuffix}`);
    const payload = {
      repo: repoName,
      owner,
      token,
      prNumber,
      isEnableSuffix,
      isEnableTeamLabel,
      teamLabel
    };
    await Action(payload);
    log.info("pr-label-action Action 成功结束运行！", repoName);
  } catch (error) {
    log.setFailed("错误：", error);
  }
})();
