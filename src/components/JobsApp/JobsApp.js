import React from "react";
import JobService from "../../service/JobService";
import {Route, Switch} from "react-router";
import JobsList from "./JobsList/JobsList";
import JobAdd from "./JobAdd/JobAdd";

class JobsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };

        this.createJob = this.createJob.bind(this);
    }

    componentDidMount() {
        this.loadJobs();
    }

    loadJobs() {
        JobService.getAllJobs().then(response => {
            this.setState(() => ({
                jobs: response.data
            }));
        })
    }

    createJob(job) {
        JobService.createJob(job).then(response => {
            this.setState(prevState => {
                const newJobs = [...prevState.jobs, response.data];
                return {
                    'jobs': newJobs
                }
            })
        })

    }

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container">
                    <Switch>
                        <Route path={"/jobs"} exact render={() => <JobsList jobs={this.state.jobs}/>} />
                        <Route path={'/jobs/new'} exact render={() => <JobAdd onCreate={this.createJob}/>}/>
                    </Switch>
                </div>
            </main>
        );
    }
}



export default JobsApp;