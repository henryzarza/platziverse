'use strict'

const db = require('../');

async function run () {
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    usermane: process.env.DB_USER || 'henryzarza',
    password: process.env.DB_PASS || '1234',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }

  const { Agent, Metric } = await db(config).catch(handleFatalError)

  const agent = await Agent.createOrUpdate({
    uuid: 'yyy',
    name: 'test',
    username: 'test',
    hostname: 'test',
    pid: 1,
    connected: true
  }).catch(handleFatalError)

  console.log('Agent-->')
  console.log(agent)

  const agents = await Agent.findAll().catch(handleFatalError)
  console.log('FindAll-->')
  console.log(agents)

  const metrics = await Metric.findByAgentUuid(agent.uuid).catch(handleFatalError)
  console.log('MetricAgent-->')
  console.log(metrics)

  const metric = await Metric.create(agent.uuid, {
    type: 'memory',
    value: '300'
  }).catch(handleFatalError)
  console.log('metric create-->')
  console.log(metric)

  const metrics2 = await Metric.findByTypeAgentUuid('memory', agent.uuid).catch(handleFatalError)
  console.log('metric consult--->')
  console.log(metrics2)
}

function handleFatalError (err) {
  console.log(err.message)
  console.log(err.stack)
  process.exit(1)
}

run()
