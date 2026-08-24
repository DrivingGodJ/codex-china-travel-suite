# Codex 中国旅行套件

这是一套面向 Codex 的中国大陆旅行插件，集中提供高德地图实时地点与路线核验、滴滴出行服务，以及飞猪和美团旅行产品查询。

## 包含的技能

- `amap-trip-planner`：核验地点、规划路线、查询天气、检查旅行安排并生成高德导航链接。
- `didi-ride`：搜索附近地点、规划路线、估算车费，以及在明确确认后执行叫车相关操作。
- `fliggy-flyai`：查询机票、酒店、景点门票和其他旅行产品。
- `meituan-travel`：查询酒店、机票、火车票、景点门票和度假产品。

本仓库不会打包 12306 相关代码。需要核验权威列车时刻和余票时，请另行使用许可证清晰的 12306 集成或官方渠道。

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

## 安全边界

- 高德地图是地点与路线的主要依据；旅行平台返回的结果只作为库存和预订候选。
- 价格、班次、库存、营业时间和预约规则都可能变化，执行前必须重新核验。
- 地点搜索、路线查询和价格估算均为只读操作。
- 创建或取消滴滴订单前，必须向用户展示最新信息并获得当次明确确认。
- 本插件不会代替用户完成购买、酒店预订、出票或支付。

## 开发与验证

```bash
npm ci --prefix plugins/codex-china-travel-suite
npm run check --prefix plugins/codex-china-travel-suite
npm test --prefix plugins/codex-china-travel-suite
```

发布前还应使用 Codex 自带的插件与技能校验器，分别检查插件清单和每个技能。

## 许可证与来源

本项目采用 MIT 许可证。高德旅行规划技能基于高德地图开放平台发布的 MIT 项目改进，并完整保留上游版权声明。详情见 [第三方声明](THIRD_PARTY_NOTICES.md)。
