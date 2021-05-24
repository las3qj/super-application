function Home({coord}) {
    return(
        <div style={{ textAlign: "center" }}>
            <h1>Welcome to Weather Checker / Restaurant Finder</h1>
            <h2>{coord.lat} , {coord.lon}</h2>
        </div>
    );
}

export default Home;