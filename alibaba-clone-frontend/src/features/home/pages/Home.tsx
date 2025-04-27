import TransportSearch from "../components/TransportationSearch";

const Home = () => {
  return (
    <div
      id="home"
      className="p-4 flex flex-col items-center justify-center"
      style={{ paddingTop: "60px" }}
    >
      <h1 className="mb-4 text-3xl font-bold text-center">
        Welcome to Alibaba
      </h1>
      <p className="text-secondary text-center">
        Your trusted travel companion
      </p>

      <br />
      <br />
      <br />
      <br />
      <TransportSearch />
    </div>
  );
};

export default Home;
