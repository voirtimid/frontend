import React, {Fragment} from "react";

const Home = (props) => {
    return (
        <div className="container-fluid w-75">
            <h2 className="mt-3">MetalCut About</h2>
            <div className="row">
                <div className="col">
                    <img className="m-5" src="http://metalkat.mk/uploads/4/8/1/0/48108331/857153.png?343" alt="metalcut logo"/>
                </div>
                <div className="col">
                    <p className="m-5" style={{"font-size":"18px"}}>
                        MetalCut Technology, has built a solid reputation for excellence in the manufacturing of
                        precision
                        prototype parts, and special machine components, servicing automotive, trucking and railway industry
                        with quality, cost-effective products.
                        <br/><br/>
                        At MetalCut Technology, our close
                        association with our customer base and consistent high quality
                        has created a strong tradition of continuous improvement and
                        steady growth.<br/><br/>We stock a wide variety of materials,
                        use state-of-the-art machines and diligently follow all design
                        specifications. We continually strive to improve and optimize
                        our processes and maximize customer convenience
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <iframe style={{"margin-top":"20px","border":"0"}}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94908.71195577052!2d21.43754104760741!3d41.98101582097829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU3JzEzLjMiTiAyMcKwMjYnMjAuNyJF!5e0!3m2!1sen!2smk!4v1429698922711"
                            width="550" height="300" frameBorder="0"/>
                </div>
            </div>
        </div>
    );
};

export default Home;
