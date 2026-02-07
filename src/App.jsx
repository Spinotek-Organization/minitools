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
import UtmBuilder from './pages/tools/marketing/UtmBuilder';
import SerpPreview from './pages/tools/marketing/SerpPreview';
import MetaGenerator from './pages/tools/marketing/MetaGenerator';
import RobotsGenerator from './pages/tools/marketing/RobotsGenerator';
import OgPreview from './pages/tools/marketing/OgPreview';
import SlugGenerator from './pages/tools/marketing/SlugGenerator';
import KeywordDensity from './pages/tools/marketing/KeywordDensity';
import TweetCounter from './pages/tools/marketing/TweetCounter';
import RedirectChecker from './pages/tools/marketing/RedirectChecker';
import SitemapGenerator from './pages/tools/marketing/SitemapGenerator';
import AdCounter from './pages/tools/marketing/AdCounter';
import HeadlineAnalyzer from './pages/tools/marketing/HeadlineAnalyzer';
import InvoiceGenerator from './pages/tools/biz/InvoiceGenerator';
import TaxCalculator from './pages/tools/biz/TaxCalculator';
import ProfitMargin from './pages/tools/biz/ProfitMargin';
import CurrencyConverter from './pages/tools/biz/CurrencyConverter';
import DiscountCalculator from './pages/tools/biz/DiscountCalculator';
import CompoundInterest from './pages/tools/biz/CompoundInterest';
import BusinessNameGenerator from './pages/tools/biz/BusinessNameGenerator';
import ReceiptMaker from './pages/tools/biz/ReceiptMaker';
import BreakEvenPoint from './pages/tools/biz/BreakEvenPoint';
import SalaryCalculator from './pages/tools/biz/SalaryCalculator';
import UnitPriceComparison from './pages/tools/biz/UnitPriceComparison';
import Bookkeeping from './pages/tools/biz/Bookkeeping';
import WaDirect from './pages/tools/sales/WaDirect';
import EmailSignature from './pages/tools/sales/EmailSignature';
import ColdEmail from './pages/tools/sales/ColdEmail';
import SalesScript from './pages/tools/sales/SalesScript';
import TimezoneConverter from './pages/tools/sales/TimezoneConverter';
import MeetingAgenda from './pages/tools/sales/MeetingAgenda';
import PriceQuote from './pages/tools/sales/PriceQuote';
import FollowupReminder from './pages/tools/sales/FollowupReminder';
import TestimonialCard from './pages/tools/sales/TestimonialCard';
import CtaIdeas from './pages/tools/sales/CtaIdeas';
import ShortLink from './pages/tools/sales/ShortLink';
import BizCardMockup from './pages/tools/sales/BizCardMockup';
import ImageResizer from './pages/tools/content/ImageResizer';
import VideoScript from './pages/tools/content/VideoScript';
import InstagramGrid from './pages/tools/content/InstagramGrid';
import HashtagGenerator from './pages/tools/content/HashtagGenerator';
import AspectRatio from './pages/tools/content/AspectRatio';
import CaptionFormatter from './pages/tools/content/CaptionFormatter';
import YoutubeThumbnail from './pages/tools/content/YoutubeThumbnail';
import PodcastPlanner from './pages/tools/content/PodcastPlanner';
import TiktokHooks from './pages/tools/content/TiktokHooks';
import EmojiPicker from './pages/tools/content/EmojiPicker';
import TtsPreview from './pages/tools/content/TtsPreview';
import WatermarkTool from './pages/tools/content/WatermarkTool';
import PaletteGenerator from './pages/tools/design/PaletteGenerator';
import ContrastChecker from './pages/tools/design/ContrastChecker';
import SvgPlaceholder from './pages/tools/design/SvgPlaceholder';
import GradientMaker from './pages/tools/design/GradientMaker';
import WebpConverter from './pages/tools/design/WebpConverter';
import IconSearcher from './pages/tools/design/IconSearcher';
import ShadowMaker from './pages/tools/design/ShadowMaker';
import FontPairer from './pages/tools/design/FontPairer';
import FaviconGenerator from './pages/tools/design/FaviconGenerator';
import BackgroundRemover from './pages/tools/design/BackgroundRemover';
import AspectRatioCalc from './pages/tools/design/AspectRatioCalc';
import PixelToRem from './pages/tools/design/PixelToRem';
import PdfTools from './pages/tools/office/PdfTools';
import WordCounter from './pages/tools/office/WordCounter';
import ExtensionRename from './pages/tools/office/ExtensionRename';
import BatchReplace from './pages/tools/office/BatchReplace';
import RomanConverter from './pages/tools/office/RomanConverter';
import SignaturePad from './pages/tools/office/SignaturePad';
import SortList from './pages/tools/office/SortList';
import RemoveDuplicates from './pages/tools/office/RemoveDuplicates';
import CaseConverter from './pages/tools/office/CaseConverter';
import MarkdownEditor from './pages/tools/office/MarkdownEditor';
import CsvToJson from './pages/tools/office/CsvToJson';
import NumberToWords from './pages/tools/office/NumberToWords';
import PomodoroTimer from './pages/tools/prod/PomodoroTimer';
import AmbientNoise from './pages/tools/prod/AmbientNoise';
import HabitTracker from './pages/tools/prod/HabitTracker';
import TodoList from './pages/tools/prod/TodoList';
import WaterReminder from './pages/tools/prod/WaterReminder';
import EyeBreak from './pages/tools/prod/EyeBreak';
import GratitudeJournal from './pages/tools/prod/GratitudeJournal';
import DecisionMatrix from './pages/tools/prod/DecisionMatrix';
import BreakTimer from './pages/tools/prod/BreakTimer';
import DailyReflection from './pages/tools/prod/DailyReflection';
import Stopwatch from './pages/tools/prod/Stopwatch';
import TimeBoxing from './pages/tools/prod/TimeBoxing';
import CitationGenerator from './pages/tools/academic/CitationGenerator';
import PercentageCalc from './pages/tools/academic/PercentageCalc';
import StatsCalc from './pages/tools/academic/StatsCalc';
import UnitConverter from './pages/tools/academic/UnitConverter';
import BinaryConverter from './pages/tools/academic/BinaryConverter';
import EquationSolver from './pages/tools/academic/EquationSolver';
import GraphPlotter from './pages/tools/academic/GraphPlotter';
import SortingVisualizer from './pages/tools/academic/SortingVisualizer';
import PlagiarismChecker from './pages/tools/academic/PlagiarismChecker';
import FractionCalc from './pages/tools/academic/FractionCalc';
import ScientificCalc from './pages/tools/academic/ScientificCalc';
import DateDifference from './pages/tools/academic/DateDifference';
import PasswordGenerator from './pages/tools/security/PasswordGenerator';
import PasswordStrength from './pages/tools/security/PasswordStrength';
import QrGenerator from './pages/tools/security/QrGenerator';
import FakeIdentity from './pages/tools/security/FakeIdentity';
import TempEmail from './pages/tools/security/TempEmail';
import SecretNote from './pages/tools/security/SecretNote';
import IpChecker from './pages/tools/security/IpChecker';
import BrowserFingerprint from './pages/tools/security/BrowserFingerprint';
import DnsLookup from './pages/tools/security/DnsLookup';
import SslChecker from './pages/tools/security/SslChecker';
import PortScanner from './pages/tools/security/PortScanner';
import TwoFactorGenerator from './pages/tools/security/TwoFactorGenerator';
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

                    {/* Marketing & SEO Routes */}
                    <Route path="/tools/marketing/utm-builder" element={<UtmBuilder />} />
                    <Route path="/tools/marketing/serp-preview" element={<SerpPreview />} />
                    <Route path="/tools/marketing/meta-generator" element={<MetaGenerator />} />
                    <Route path="/tools/marketing/robots-generator" element={<RobotsGenerator />} />
                    <Route path="/tools/marketing/og-preview" element={<OgPreview />} />
                    <Route path="/tools/marketing/slug-generator" element={<SlugGenerator />} />
                    <Route path="/tools/marketing/keyword-density" element={<KeywordDensity />} />
                    <Route path="/tools/marketing/tweet-counter" element={<TweetCounter />} />
                    <Route path="/tools/marketing/redirect-checker" element={<RedirectChecker />} />
                    <Route path="/tools/marketing/sitemap-generator" element={<SitemapGenerator />} />
                    <Route path="/tools/marketing/ad-counter" element={<AdCounter />} />
                    <Route path="/tools/marketing/headline-analyzer" element={<HeadlineAnalyzer />} />

                    {/* Business & Finance Routes */}
                    <Route path="/tools/biz/invoice-generator" element={<InvoiceGenerator />} />
                    <Route path="/tools/biz/tax-calculator" element={<TaxCalculator />} />
                    <Route path="/tools/biz/profit-margin" element={<ProfitMargin />} />
                    <Route path="/tools/biz/currency-converter" element={<CurrencyConverter />} />
                    <Route path="/tools/biz/discount-calculator" element={<DiscountCalculator />} />
                    <Route path="/tools/biz/compound-interest" element={<CompoundInterest />} />
                    <Route path="/tools/biz/business-name-generator" element={<BusinessNameGenerator />} />
                    <Route path="/tools/biz/receipt-maker" element={<ReceiptMaker />} />
                    <Route path="/tools/biz/break-even" element={<BreakEvenPoint />} />
                    <Route path="/tools/biz/salary-calculator" element={<SalaryCalculator />} />
                    <Route path="/tools/biz/unit-price" element={<UnitPriceComparison />} />
                    <Route path="/tools/biz/bookkeeping" element={<Bookkeeping />} />

                    {/* Sales & Customer Support Routes */}
                    <Route path="/tools/sales/wa-direct" element={<WaDirect />} />
                    <Route path="/tools/sales/email-signature" element={<EmailSignature />} />
                    <Route path="/tools/sales/cold-email" element={<ColdEmail />} />
                    <Route path="/tools/sales/sales-script" element={<SalesScript />} />
                    <Route path="/tools/sales/timezone-converter" element={<TimezoneConverter />} />
                    <Route path="/tools/sales/meeting-agenda" element={<MeetingAgenda />} />
                    <Route path="/tools/sales/price-quote" element={<PriceQuote />} />
                    <Route path="/tools/sales/followup-reminder" element={<FollowupReminder />} />
                    <Route path="/tools/sales/testimonial-card" element={<TestimonialCard />} />
                    <Route path="/tools/sales/cta-ideas" element={<CtaIdeas />} />
                    <Route path="/tools/sales/short-link" element={<ShortLink />} />
                    <Route path="/tools/sales/biz-card-mockup" element={<BizCardMockup />} />

                    {/* Content & Social Media Routes */}
                    <Route path="/tools/content/image-resizer" element={<ImageResizer />} />
                    <Route path="/tools/content/video-script" element={<VideoScript />} />
                    <Route path="/tools/content/instagram-grid" element={<InstagramGrid />} />
                    <Route path="/tools/content/hashtag-generator" element={<HashtagGenerator />} />
                    <Route path="/tools/content/aspect-ratio" element={<AspectRatio />} />
                    <Route path="/tools/content/caption-formatter" element={<CaptionFormatter />} />
                    <Route path="/tools/content/youtube-thumbnail" element={<YoutubeThumbnail />} />
                    <Route path="/tools/content/podcast-planner" element={<PodcastPlanner />} />
                    <Route path="/tools/content/tiktok-hooks" element={<TiktokHooks />} />
                    <Route path="/tools/content/emoji-picker" element={<EmojiPicker />} />
                    <Route path="/tools/content/text-to-speech" element={<TtsPreview />} />
                    <Route path="/tools/content/watermark" element={<WatermarkTool />} />

                    {/* Design & Visual Routes */}
                    <Route path="/tools/design/palette-generator" element={<PaletteGenerator />} />
                    <Route path="/tools/design/contrast-checker" element={<ContrastChecker />} />
                    <Route path="/tools/design/svg-placeholder" element={<SvgPlaceholder />} />
                    <Route path="/tools/design/gradient-maker" element={<GradientMaker />} />
                    <Route path="/tools/design/webp-converter" element={<WebpConverter />} />
                    <Route path="/tools/design/icon-search" element={<IconSearcher />} />
                    <Route path="/tools/design/shadow-maker" element={<ShadowMaker />} />
                    <Route path="/tools/design/font-pairer" element={<FontPairer />} />
                    <Route path="/tools/design/favicon-generator" element={<FaviconGenerator />} />
                    <Route path="/tools/design/background-remover" element={<BackgroundRemover />} />
                    <Route path="/tools/design/aspect-ratio" element={<AspectRatioCalc />} />
                    <Route path="/tools/design/pixel-to-rem" element={<PixelToRem />} />

                    {/* Office & Admin Routes */}
                    <Route path="/tools/office/pdf-tools" element={<PdfTools />} />
                    <Route path="/tools/office/word-counter" element={<WordCounter />} />
                    <Route path="/tools/office/extension-rename" element={<ExtensionRename />} />
                    <Route path="/tools/office/batch-replace" element={<BatchReplace />} />
                    <Route path="/tools/office/roman-converter" element={<RomanConverter />} />
                    <Route path="/tools/office/signature-pad" element={<SignaturePad />} />
                    <Route path="/tools/office/sort-list" element={<SortList />} />
                    <Route path="/tools/office/remove-duplicates" element={<RemoveDuplicates />} />
                    <Route path="/tools/office/case-converter" element={<CaseConverter />} />
                    <Route path="/tools/office/markdown-editor" element={<MarkdownEditor />} />
                    <Route path="/tools/office/csv-to-json" element={<CsvToJson />} />
                    <Route path="/tools/office/number-to-words" element={<NumberToWords />} />

                    {/* Productivity & Self-Care Routes */}
                    <Route path="/tools/prod/pomodoro" element={<PomodoroTimer />} />
                    <Route path="/tools/prod/ambient-noise" element={<AmbientNoise />} />
                    <Route path="/tools/prod/habit-tracker" element={<HabitTracker />} />
                    <Route path="/tools/prod/todo-list" element={<TodoList />} />
                    <Route path="/tools/prod/water-reminder" element={<WaterReminder />} />
                    <Route path="/tools/prod/eye-break" element={<EyeBreak />} />
                    <Route path="/tools/prod/gratitude-journal" element={<GratitudeJournal />} />
                    <Route path="/tools/prod/decision-matrix" element={<DecisionMatrix />} />
                    <Route path="/tools/prod/break-timer" element={<BreakTimer />} />
                    <Route path="/tools/prod/daily-reflection" element={<DailyReflection />} />
                    <Route path="/tools/prod/stopwatch" element={<Stopwatch />} />
                    <Route path="/tools/prod/time-boxing" element={<TimeBoxing />} />

                    {/* Academic & Data Routes */}
                    <Route path="/tools/academic/citation-generator" element={<CitationGenerator />} />
                    <Route path="/tools/academic/percentage-calc" element={<PercentageCalc />} />
                    <Route path="/tools/academic/stats-calc" element={<StatsCalc />} />
                    <Route path="/tools/academic/unit-converter" element={<UnitConverter />} />
                    <Route path="/tools/academic/binary-converter" element={<BinaryConverter />} />
                    <Route path="/tools/academic/equation-solver" element={<EquationSolver />} />
                    <Route path="/tools/academic/graph-plotter" element={<GraphPlotter />} />
                    <Route path="/tools/academic/sorting-visualizer" element={<SortingVisualizer />} />
                    <Route path="/tools/academic/plagiarism-checker" element={<PlagiarismChecker />} />
                    <Route path="/tools/academic/fraction-calc" element={<FractionCalc />} />
                    <Route path="/tools/academic/scientific-calc" element={<ScientificCalc />} />
                    <Route path="/tools/academic/date-difference" element={<DateDifference />} />

                    {/* Security & Privacy Routes */}
                    <Route path="/tools/security/password-generator" element={<PasswordGenerator />} />
                    <Route path="/tools/security/password-strength" element={<PasswordStrength />} />
                    <Route path="/tools/security/qr-generator" element={<QrGenerator />} />
                    <Route path="/tools/security/fake-identity" element={<FakeIdentity />} />
                    <Route path="/tools/security/temp-email" element={<TempEmail />} />
                    <Route path="/tools/security/secret-note" element={<SecretNote />} />
                    <Route path="/tools/security/ip-checker" element={<IpChecker />} />
                    <Route path="/tools/security/browser-fingerprint" element={<BrowserFingerprint />} />
                    <Route path="/tools/security/dns-lookup" element={<DnsLookup />} />
                    <Route path="/tools/security/ssl-checker" element={<SslChecker />} />
                    <Route path="/tools/security/port-scanner" element={<PortScanner />} />
                    <Route path="/tools/security/2fa-gen" element={<TwoFactorGenerator />} />

                    <Route path="/category/:id" element={<CategoryPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
