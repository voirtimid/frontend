import React from "react";
import {Route, Switch} from "react-router-dom";
import SketchSearch from "./SketchSearch/SketchSearch";
import SketchAdd from "./SketchAdd/SketchAdd";
import SketchDetails from "./SketchDetails/SketchDetails";
import JobAdd from "../JobsApp/JobAdd/JobAdd";

class SketchesApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sketch: {}
        }
    }

    render() {
        return (
            <main>
                <div className="container">
                    <Switch>
                        <Route path={"/sketches"} exact render={() => <SketchSearch />}/>
                        <Route path={"/sketches/new"} exact render={() => <SketchAdd />}/>
                        <Route path={"/sketches/:sketchId/new"} exact render={() => <JobAdd />}/>
                        <Route path={"/sketches/:sketchId"} exact render={() => <SketchDetails />}/>
                    </Switch>
                </div>
            </main>
        );
    }

}

export default SketchesApp;