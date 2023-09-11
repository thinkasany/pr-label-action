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

jobs:
  checkin:
    runs-on: ubuntu-latest
    steps:
      - name: Check PR number
        id: pr_number
        run: echo "PR_NUMBER=${{ github.event.pull_request.number }}" >> $GITHUB_ENV

      - name: Run pr-label Action
        uses: thinkasany/pr-label-action@master
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          pr_number: ${{ env.PR_NUMBER }}
```
### yml demo

# 🌈实现效果
<a href="https://thinkasany.github.io/test/" target="_blank"><img src="./demo/contributors.png"></a>