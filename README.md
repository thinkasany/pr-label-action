# 🌊自我介绍


# 🚀谁在用我
| # | 社区| 描述 | 热度 |
| --- | --- | --- | --- |


# 🍔 使用指南
### [示例仓库](https://github.com/thinkasany/test)


### yml配置
```
name: test-pr-listen

on:
  pull_request:
    types:
      - opened
      - synchronize
  workflow_dispatch: # 添加手动触发事件
    inputs:
      pr_number:
        description: 'PR Number'
        required: true
jobs:
  checkin:
    runs-on: ubuntu-latest
    steps:
      - name: Check PR number
        id: pr_number
        run: echo "PR_NUMBER=${{ github.event.pull_request.number }}" >> $GITHUB_ENV

      - name: Run Custom Action
        uses: thinkasany/pr-label-action@dev
        with:
          github_token: ${{ secrets.ACTION_TOKEN }}
          pr_number: ${{ env.PR_NUMBER }}
          organize_name: 'actionv' # 组织的名字
          team_name: 'action-team' # team的名字
```
### yml demo

# 🌈实现效果
<a href="https://thinkasany.github.io/test/" target="_blank"><img src="./demo/contributors.png"></a>