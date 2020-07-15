import React from "react";
import JobService from "../../service/JobService";
import {Route, Switch} from "react-router";
import TaskDetailsHistory from "../Tasks/TaskDetailsHistory/TaskDetailsHistory";
import JobsListHistory from "./JobsListHistory/JobsListHistory";
import JobHistory from "./JobHistory/JobHistory";
import { reactAutoBind } from 'auto-bind2'

class JobsHistoryApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            task: {},
            pageSize:2,
            page:0,
            totalPages:0

        };
        reactAutoBind(this);
    }

    componentDidMount() {
        this.loadJobs();
    }

    loadJobs(page = 0, size = 5) {
        JobService.getAllJobsHistoryPaged(page, size).then(response => {
            const jobs = response.data.content;
            this.setState({
                jobs: jobs,
                page: response.data.pageable.pageNumber,
                pageSize: response.data.pageable.pageSize,
                totalPages: response.data.totalPages
            });
        });
    }

    updateJobs(dateDTO) {

        JobService.getAllFilteredJobsPaged(dateDTO).then(response => {
            this.setState(() => ({
                jobs: response.data.content,
                page: response.data.pageable.pageNumber,
                pageSize: response.data.pageable.pageSize,
                totalPages: response.data.totalPages
            }))
        })
    }

    toShow() {
        if (this.props.loggedIn) {
            return (
                <Switch>
                    <Route path={"/history/jobs"} exact render={() => <JobsListHistory onSubmit={this.updateJobs} onClearFilters={this.loadJobs} onPageClick={this.loadJobs} jobs={this.state.jobs} totalPages={this.state.totalPages}/>} />
                    <Route path={"/history/jobs/:jobId"} exact render={() => <JobHistory />}/>
                    <Route path={"/history/jobs/:jobId/tasks/:taskId"} exact render={() => <TaskDetailsHistory />}/>
                </Switch>
            );
        }
    }

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container-fluid w-75">
                    {this.toShow()}
                    {/*<Switch>*/}
                    {/*    <Route path={"/history/jobs"} exact render={() => <JobsListHistory onSubmit={this.updateJobs} onClearFilters={this.loadJobs} onPageClick={this.loadJobs} jobs={this.state.jobs} totalPages={this.state.totalPages}/>} />*/}
                    {/*    <Route path={"/history/jobs/:jobId"} exact render={() => <JobHistory />}/>*/}
                    {/*    <Route path={"/history/jobs/:jobId/tasks/:taskId"} exact render={() => <TaskDetailsHistory />}/>*/}
                    {/*</Switch>*/}
                </div>
            </main>
        );
    }
}

export default JobsHistoryApp;
