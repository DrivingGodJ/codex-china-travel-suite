**简体中文** | [English](README.en.md)

# Codex 中国旅行套件

面向中国大陆出行的 Codex 插件，将地点与路线核验、出行服务查询、铁路行程协调和日历整理放进同一套工作流。

## 功能特性

| 技能 | 用途 |
| --- | --- |
| `amap-trip-planner` | 高德地点、路线、天气和导航链接核验 |
| `didi-ride` | 地点搜索、路线、车费估算和按明确确认执行的叫车操作 |
| `fliggy-flyai` | 飞猪机票、酒店、门票和旅行产品查询 |
| `meituan-travel` | 美团旅行酒店、交通、门票和度假产品查询 |
| `rail-trip-planner` | 围绕活动时间核对车站、中转与末班车，按授权辅助订票 |
| `icloud-calendar` | 查重、按现有日历分类、整理日程与提醒，并回读验证 |

## 快速开始

需要 Node.js **20+** 和支持插件的 Codex。在终端执行：

```bash
git clone https://github.com/DrivingGodJ/codex-china-travel-suite.git
cd codex-china-travel-suite
npm ci --prefix plugins/codex-china-travel-suite
codex plugin marketplace add .
codex plugin add codex-china-travel-suite@drivinggodj-travel
```

只配置实际需要的服务。以下为 Bash 环境变量示例；填入的真实值仅保存在自己的环境中：

```bash
export AMAP_MCP_KEY=""
export DIDI_MCP_KEY=""
export MEITUAN_HT_TOKEN=""
export FLYAI_API_KEY=""
```

Windows 可在用户环境变量中填写，随后完全退出并重开 Codex。macOS 还可将高德和滴滴凭据保存到钥匙串服务 `codex-china-travel-suite-amap-key`、`codex-china-travel-suite-didi-key`。不要向对话或仓库提交真实凭据。

## 使用说明

例如请求“检查明天的南京行程和接驳时间”，再按需要明确要求订票或写入日历。地点与路线以高德核验为主；价格、库存、班次、营业时间和预约规则须在实际执行前重新确认。

铁路依赖另外配置的 12306 集成或官方网页/App，不随本仓库分发客户端代码；已安装 `12306-train-assistant` 时可复用。iCloud 日历同样复用独立的 CalDAV MCP。新连接可使用 `@lukegskw/caldav-mcp@0.1.9`，需 Node.js **22+**、`CALDAV_USERNAME` 和 Apple App 专用密码 `CALDAV_PASSWORD`，详见[日历连接说明](plugins/codex-china-travel-suite/skills/icloud-calendar/references/setup.md)。安装成功后须实际列出并读取日历，才算连接可用。

- 查询不授权下单、支付、取消订单或写日历。创建或取消滴滴订单前，展示最新信息并取得当次明确确认。
- 锁座或待支付不等于已出票；官方确认付款/出票后才标为已购票。支付页被浏览器策略拦截时转交用户在官方 App 完成，再核对订单。
- 日历先查重，再按用户现有列表分类；保留时间、地点、备注和多条提醒。跨列表移动先验证目标再移除来源，最后复查无重复。

## 开发与验证

```bash
npm ci --prefix plugins/codex-china-travel-suite
npm run check --prefix plugins/codex-china-travel-suite
npm test --prefix plugins/codex-china-travel-suite
```

发布前还需使用 Codex 的插件与技能校验器检查清单和各技能。服务登录与真实订单状态需在自己的环境单独核验。

## 文档与支持

- [更新记录](CHANGELOG.md) · [参与贡献](CONTRIBUTING.md) · [安全说明](SECURITY.md)
- [问题反馈](https://github.com/DrivingGodJ/codex-china-travel-suite/issues)

## 许可与致谢

[MIT License](LICENSE)。高德旅行规划技能基于高德地图开放平台发布的 MIT 项目改进，保留上游版权声明，见[第三方声明](THIRD_PARTY_NOTICES.md)。本仓库不附带私人账号。
