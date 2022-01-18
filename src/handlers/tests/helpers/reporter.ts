import { SpecReporter } from 'jasmine-spec-reporter'
import {} from 'jasmine'

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
    new SpecReporter({
        spec: {
            displayPending: true,
        },
    })
)
