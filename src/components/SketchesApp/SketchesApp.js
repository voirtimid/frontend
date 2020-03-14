import React from "react";
import {Route, Switch} from "react-router-dom";
import SketchSearch from "./SketchSearch/SketchSearch";
import SketchAdd from "./SketchAdd/SketchAdd";
import SketchDetails from "./SketchDetails/SketchDetails";
import SketchesNewVersion from "./SketchesNewVersion/SketchesNewVersion";

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
                <div className="container-fluid w-75">
                    <Switch>
                        <Route path={"/sketches"} exact render={() => <SketchSearch  />}/>
                        <Route path={"/sketches/new"} exact render={() => <SketchAdd />}/>
                        <Route path={"/sketches/new/version/:drawing"} exact render={() => <SketchesNewVersion />}/>
                        <Route path={"/sketches/new/:drawing"} exact render={() => <SketchAdd />}/>
                        <Route path={"/sketches/:sketchId"} exact render={() => <SketchDetails />}/>
                    </Switch>
                </div>
            </main>
        );
    }

}

export default SketchesApp;