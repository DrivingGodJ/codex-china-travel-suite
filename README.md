# Codex 中国旅行套件

这是一套面向 Codex 的中国大陆旅行插件，提供高德地图实时地点与路线核验、滴滴出行服务、飞猪和美团旅行产品查询，以及 12306 行程协调和 iCloud 日历整理流程。

## 包含的技能

- `amap-trip-planner`：核验地点、规划路线、查询天气、检查旅行安排并生成高德导航链接。
- `didi-ride`：搜索附近地点、规划路线、估算车费，以及在明确确认后执行叫车相关操作。
- `fliggy-flyai`：查询机票、酒店、景点门票和其他旅行产品。
- `meituan-travel`：查询酒店、机票、火车票、景点门票和度假产品。
- `rail-trip-planner`：围绕活动结束时间挑选火车，核对实际车站、中转和末班车；按授权协助订票，区分待支付与已出票。
- `icloud-calendar`：先查重，再按现有日历列表分类新增、修改或移动日程，保留时间、地点、备注和多条提醒，完成后复查。

本仓库不会打包 12306 客户端代码。铁路流程使用另行配置的 12306 集成或官方网页/App；若已安装 `12306-train-assistant`，可按其说明调用。日历流程复用独立配置的 iCloud CalDAV MCP，不会重复安装服务或随插件附带私人账号。

## 安装

需要 Node.js 20 或更高版本，以及支持插件功能的 Codex。

```bash
git clone https://github.com/DrivingGodJ/codex-china-travel-suite.git
cd codex-china-travel-suite
npm ci --prefix plugins/codex-china-travel-suite
codex plugin marketplace add .
codex plugin add codex-china-travel-suite@drivinggodj-travel
```

## 配置服务凭据

只需配置实际使用的服务：

```bash
export AMAP_MCP_KEY=""       # 高德 MCP 密钥
export DIDI_MCP_KEY=""       # 滴滴 MCP 密钥
export MEITUAN_HT_TOKEN=""   # 美团旅行令牌
export FLYAI_API_KEY=""      # 飞猪 FlyAI Key
```

不要把真实凭据粘贴到对话中，也不要提交到 Git 仓库。macOS 用户还可以把高德和滴滴凭据分别保存到以下钥匙串服务：

- `codex-china-travel-suite-amap-key`
- `codex-china-travel-suite-didi-key`

### iCloud 日历（可选）

已有可用的 `icloud-calendar` MCP 连接时直接复用。新连接可使用 `@lukegskw/caldav-mcp@0.1.9`，需要独立的 Node.js 22 或更高版本运行环境，以及私下配置的 `CALDAV_USERNAME`（Apple 账户邮箱）和 `CALDAV_PASSWORD`（Apple App 专用密码）。详细步骤见[日历连接说明](plugins/codex-china-travel-suite/skills/icloud-calendar/references/setup.md)。

Windows 用户在用户环境变量中填写凭据后，需要完全退出并重新打开 Codex，让新进程读取变量。安装成功不等于已登录；须实际列出日历并读取指定日期来验证连接。

### 日程整理规则

新增、修改或移动前，检查涉及日期和相关列表中的已有事件，优先更新同一条记录。按用户的现有列表和明确指定分类，例如参观活动放入“活动”、交通接驳放入“日程”，不要把所有行程条目默认塞进同一个列表。跨列表移动需先验证目标记录完整，再移除来源副本，最后检查没有重复。上述名称只是分类示例，不会强制新建同名列表。

## 安全边界

- 高德地图是地点与路线的主要依据；旅行平台返回的结果只作为库存和预订候选。
- 价格、班次、库存、营业时间和预约规则都可能变化，执行前必须重新核验。
- 地点搜索、路线查询和价格估算均为只读操作。
- 创建或取消滴滴订单前，必须向用户展示最新信息并获得当次明确确认。
- 查询本身不授权购票、酒店预订、叫车或日历写入；只在用户明确要求的范围内执行，并保留仍然适用的授权。
- 下单和席位锁定不等于付款成功。只有官方订单确认付款/出票后，才将消息和日历标为已购票；未订的接驳票、出租车和住宿继续注明未订。
- 浏览器安全策略拦截支付页面时停止该流程，由用户在官方 App 内支付，再核对订单结果。

## 开发与验证

```bash
npm ci --prefix plugins/codex-china-travel-suite
npm run check --prefix plugins/codex-china-travel-suite
npm test --prefix plugins/codex-china-travel-suite
```

发布前还应使用 Codex 自带的插件与技能校验器，分别检查插件清单和每个技能。

## 许可证与来源

本项目采用 MIT 许可证。高德旅行规划技能基于高德地图开放平台发布的 MIT 项目改进，并完整保留上游版权声明。详情见 [第三方声明](THIRD_PARTY_NOTICES.md)。
