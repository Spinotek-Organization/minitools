import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import ScrollToTop from './components/shared/ScrollToTop';
import JsonFormatter from './pages/tools/dev/JsonFormatter';
import Base64Codec from './pages/tools/dev/Base64Codec';
import UrlCodec from './pages/tools/dev/UrlCodec';
import HtmlCodec from './pages/tools/dev/HtmlCodec';
import RegexTester from './pages/tools/dev/RegexTester';
import JWTDebugger from './pages/tools/dev/JWTDebugger';
import SqlFormatter from './pages/tools/dev/SqlFormatter';
import UuidGenerator from './pages/tools/dev/UuidGenerator';
import HashGenerator from './pages/tools/dev/HashGenerator';
import CronEditor from './pages/tools/dev/CronEditor';
import DiffChecker from './pages/tools/dev/DiffChecker';
import JsMinifier from './pages/tools/dev/JsMinifier';
import CategoryPage from './pages/tools/CategoryPage';
import ExploreToolsPage from './pages/tools/ExploreToolsPage';
import Home from './pages/Home';
import { Helmet } from 'react-helmet-async';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<ExploreToolsPage />} />
                    <Route path="/tools/dev/json-formatter" element={
                        <>
                            <Helmet>
                                <title>JSON Formatter & Validator | Mini Tools by Spinotek</title>
                                <meta name="description" content="Clean, format, and validate your JSON data instantly with our professional JSON Formatter tool." />
                            </Helmet>
                            <JsonFormatter />
                        </>
                    } />
                    <Route path="/tools/dev/base64-encoder" element={<Base64Codec />} />
                    <Route path="/tools/dev/url-encoder" element={<UrlCodec />} />
                    <Route path="/tools/dev/html-encoder" element={<HtmlCodec />} />
                    <Route path="/tools/dev/regex-tester" element={<RegexTester />} />
                    <Route path="/tools/dev/jwt-debugger" element={<JWTDebugger />} />
                    <Route path="/tools/dev/sql-formatter" element={<SqlFormatter />} />
                    <Route path="/tools/dev/uuid-generator" element={<UuidGenerator />} />
                    <Route path="/tools/dev/hash-generator" element={<HashGenerator />} />
                    <Route path="/tools/dev/cron-editor" element={<CronEditor />} />
                    <Route path="/tools/dev/diff-checker" element={<DiffChecker />} />
                    <Route path="/tools/dev/js-minifier" element={<JsMinifier />} />
                    <Route path="/category/:id" element={<CategoryPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
