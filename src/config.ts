export default class Config {
  environmentLocal: string
  environmentStaging: string
  environmentProduction: string
  apiUrl: string
  apiUrlLocal: string
  apiUrlStaging: string
  apiUrlProduction: string
  eventsUrl: string
  eventsUrlLocal: string
  eventsUrlStaging: string
  eventsUrlProduction: string
  customEnvironment: string
  environment: string
  environments: string[]
  maxSessionDays: number
  sessionName: string
  version: string
  widgetDivClass: string
  widgetId: string

  constructor() {
    this.environmentLocal = 'local'
    this.environmentStaging = 'staging'
    this.environmentProduction = 'production'

    this.apiUrl = 'https://api.tonicpow.com'
    this.apiUrlLocal = 'http://localhost:3000'
    this.apiUrlStaging = 'https://api.staging.tonicpow.com'
    this.apiUrlProduction = 'https://api.tonicpow.com'
    this.eventsUrl = 'https://events.tonicpow.com'
    this.eventsUrlLocal = 'http://localhost:3002'
    this.eventsUrlStaging = 'https://events.staging.tonicpow.com'
    this.eventsUrlProduction = 'https://events.tonicpow.com'
    this.customEnvironment = 'data-environment'
    this.environment = ''
    this.environments = [this.environmentLocal, this.environmentStaging, this.environmentProduction]
    this.maxSessionDays = 60
    this.sessionName = 'tncpw_session'
    this.version = 'v0.0.8'
    this.widgetDivClass = 'tonicpow-widget'
    this.widgetId = 'data-widget-id'
  }

  // isEnvironmentValid will check if the given environment is valid
  isEnvironmentValid = (environment: string) => this.environments.includes(environment)

  // setEnvironment will set the environment
  setEnvironment = (environment: string) => {
    // No environment set? use the default
    if (!environment) {
      return
    }

    // Not a valid environment?
    if (!this.isEnvironmentValid(environment)) {
      return
    }

    // Set the environment
    this.environment = environment

    // Set the API url
    if (environment === this.environmentStaging) {
      this.apiUrl = this.apiUrlStaging
      this.eventsUrl = this.eventsUrlStaging
    } else if (environment === this.environmentLocal) {
      this.apiUrl = this.apiUrlLocal
      this.eventsUrl = this.eventsUrlLocal
    } else if (environment === this.environmentProduction) {
      this.apiUrl = this.apiUrlProduction
      this.eventsUrl = this.eventsUrlProduction
    }
  }
}