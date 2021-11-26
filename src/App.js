import Header from "./components/header";
import Footer from "./components/footer";
import Index from "./pages/index";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Index />
      </div>
      <Footer />
    </>
  );
}

export default App;
