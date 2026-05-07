import { useState } from "react";

const AR = {
  dashboard: "لوحة التحكم",
  restaurants: "المطاعم",
  orders: "الطلبات",
  complaints: "الشكاوى",
  customers: "العملاء",
  settings: "الإعدادات",
  active: "نشط",
  inactive: "غير نشط",
  pending: "قيد الانتظار",
  suspended: "موقوف",
  totalRestaurants: "إجمالي المطاعم",
  activeToday: "نشط اليوم",
  totalOrders: "إجمالي الطلبات",
  openComplaints: "شكاوى مفتوحة",
  menu: "القائمة",
  conversations: "المحادثات",
  history: "السجل",
  search: "بحث...",
  addRestaurant: "إضافة مطعم",
  viewMenu: "عرض القائمة",
  viewOrders: "عرض الطلبات",
  viewComplaints: "عرض الشكاوى",
  lastOrder: "آخر طلب",
  rating: "التقييم",
  items: "عناصر",
  back: "رجوع",
  category: "الفئة",
  price: "السعر",
  availability: "التوفر",
  available: "متاح",
  unavailable: "غير متاح",
  customerName: "اسم العميل",
  phone: "الهاتف",
  status: "الحالة",
  date: "التاريخ",
  resolve: "حل",
  open: "مفتوح",
  resolved: "محلول",
  escalated: "مُصعَّد",
  orderValue: "قيمة الطلب",
  channel: "القناة",
  voice: "صوت",
  whatsapp: "واتساب",
  web: "ويب",
  allStatus: "كل الحالات",
};

const EN = {
  dashboard: "Dashboard",
  restaurants: "Restaurants",
  orders: "Orders",
  complaints: "Complaints",
  customers: "Customers",
  settings: "Settings",
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  suspended: "Suspended",
  totalRestaurants: "Total Restaurants",
  activeToday: "Active Today",
  totalOrders: "Total Orders",
  openComplaints: "Open Complaints",
  menu: "Menu",
  conversations: "Conversations",
  history: "History",
  search: "Search...",
  addRestaurant: "Add Restaurant",
  viewMenu: "View Menu",
  viewOrders: "View Orders",
  viewComplaints: "View Complaints",
  lastOrder: "Last Order",
  rating: "Rating",
  items: "items",
  back: "Back",
  category: "Category",
  price: "Price",
  availability: "Availability",
  available: "Available",
  unavailable: "Unavailable",
  customerName: "Customer Name",
  phone: "Phone",
  status: "Status",
  date: "Date",
  resolve: "Resolve",
  open: "Open",
  resolved: "Resolved",
  escalated: "Escalated",
  orderValue: "Order Value",
  channel: "Channel",
  voice: "Voice",
  whatsapp: "WhatsApp",
  web: "Web",
  allStatus: "All Status",
};

const restaurants = [
  { id: 1, name: "كشري التحرير", nameEn: "Koshary El Tahrir", logo: "ك", color: "#c8a96e", cuisine: "مصري", cuisineEn: "Egyptian", status: "active", orders: 1247, rating: 4.8, lastOrder: "منذ 3 دقائق", lastOrderEn: "3 min ago", menuItems: 18, complaints: 2, city: "القاهرة", cityEn: "Cairo", revenue: "EGP 45,200", phone: "01012345678" },
  { id: 2, name: "مطعم فيصل", nameEn: "Faisal Restaurant", logo: "ف", color: "#7c9e6e", cuisine: "شرقي", cuisineEn: "Oriental", status: "active", orders: 892, rating: 4.5, lastOrder: "منذ 12 دقيقة", lastOrderEn: "12 min ago", menuItems: 34, complaints: 0, city: "الجيزة", cityEn: "Giza", revenue: "EGP 32,100", phone: "01123456789" },
  { id: 3, name: "بيتزا فورنو", nameEn: "Pizza Forno", logo: "ب", color: "#c86e6e", cuisine: "إيطالي", cuisineEn: "Italian", status: "pending", orders: 443, rating: 4.2, lastOrder: "منذ 1 ساعة", lastOrderEn: "1 hr ago", menuItems: 22, complaints: 5, city: "الإسكندرية", cityEn: "Alexandria", revenue: "EGP 18,900", phone: "01234567890" },
  { id: 4, name: "شاورما الأمير", nameEn: "Shawerma El Amir", logo: "ش", color: "#6e8ec8", cuisine: "شامي", cuisineEn: "Levantine", status: "active", orders: 2103, rating: 4.9, lastOrder: "منذ دقيقة", lastOrderEn: "1 min ago", menuItems: 15, complaints: 1, city: "القاهرة", cityEn: "Cairo", revenue: "EGP 78,600", phone: "01098765432" },
  { id: 5, name: "مطعم البحر", nameEn: "El Bahr Restaurant", logo: "م", color: "#6ec8c8", cuisine: "مأكولات بحرية", cuisineEn: "Seafood", status: "suspended", orders: 67, rating: 3.1, lastOrder: "منذ 2 يوم", lastOrderEn: "2 days ago", menuItems: 28, complaints: 11, city: "الإسكندرية", cityEn: "Alexandria", revenue: "EGP 5,200", phone: "01156789012" },
  { id: 6, name: "برجر كينج مصر", nameEn: "Burger King Egypt", logo: "ب", color: "#c8a96e", cuisine: "أمريكي", cuisineEn: "American", status: "active", orders: 3412, rating: 4.3, lastOrder: "الآن", lastOrderEn: "Just now", menuItems: 41, complaints: 3, city: "القاهرة", cityEn: "Cairo", revenue: "EGP 124,300", phone: "01187654321" },
];

const menuItemsData = [
  { id: 1, name: "كشري كبير", nameEn: "Large Koshary", category: "أطباق رئيسية", categoryEn: "Main Dishes", price: "35", available: true },
  { id: 2, name: "كشري وسط", nameEn: "Medium Koshary", category: "أطباق رئيسية", categoryEn: "Main Dishes", price: "25", available: true },
  { id: 3, name: "كشري صغير", nameEn: "Small Koshary", category: "أطباق رئيسية", categoryEn: "Main Dishes", price: "18", available: true },
  { id: 4, name: "عدس بالخل", nameEn: "Lentils with Vinegar", category: "إضافات", categoryEn: "Extras", price: "10", available: true },
  { id: 5, name: "صلصة حارة", nameEn: "Spicy Sauce", category: "إضافات", categoryEn: "Extras", price: "5", available: false },
  { id: 6, name: "عصير بتقان", nameEn: "Orange Juice", category: "مشروبات", categoryEn: "Drinks", price: "20", available: true },
];

const complaintsData = [
  { id: 1, customer: "أحمد محمد", phone: "01012345678", restaurant: "بيتزا فورنو", restaurantEn: "Pizza Forno", issue: "تأخير في التوصيل أكثر من ساعة", issueEn: "Delivery delayed over 1 hour", status: "open", date: "2025-05-04", priority: "high" },
  { id: 2, customer: "سارة أحمد", phone: "01123456789", restaurant: "مطعم البحر", restaurantEn: "El Bahr", issue: "الطلب وصل ناقص", issueEn: "Order arrived incomplete", status: "escalated", date: "2025-05-04", priority: "critical" },
  { id: 3, customer: "محمود علي", phone: "01234567890", restaurant: "بيتزا فورنو", restaurantEn: "Pizza Forno", issue: "جودة الطعام سيئة", issueEn: "Poor food quality", status: "open", date: "2025-05-03", priority: "medium" },
  { id: 4, customer: "نور حسن", phone: "01098765432", restaurant: "شاورما الأمير", restaurantEn: "Shawerma El Amir", issue: "دفع مرتين للنفس الطلب", issueEn: "Charged twice for same order", status: "resolved", date: "2025-05-02", priority: "high" },
  { id: 5, customer: "كريم فاروق", phone: "01156789012", restaurant: "مطعم البحر", restaurantEn: "El Bahr", issue: "رد الوكيل الصوتي غير صحيح", issueEn: "Voice agent gave wrong response", status: "open", date: "2025-05-01", priority: "medium" },
];

const ordersData = [
  { id: "#ORD-4521", customer: "أحمد محمود", restaurant: "شاورما الأمير", value: "EGP 145", status: "delivered", channel: "voice", date: "2025-05-05 14:32" },
  { id: "#ORD-4520", customer: "ليلى إبراهيم", restaurant: "كشري التحرير", value: "EGP 78", status: "preparing", channel: "web", date: "2025-05-05 14:28" },
  { id: "#ORD-4519", customer: "عمر سالم", restaurant: "برجر كينج مصر", value: "EGP 220", status: "delivered", channel: "voice", date: "2025-05-05 14:10" },
  { id: "#ORD-4518", customer: "منى طارق", restaurant: "مطعم فيصل", value: "EGP 195", status: "cancelled", channel: "whatsapp", date: "2025-05-05 13:55" },
  { id: "#ORD-4517", customer: "يوسف خالد", restaurant: "شاورما الأمير", value: "EGP 89", status: "delivered", channel: "voice", date: "2025-05-05 13:40" },
  { id: "#ORD-4516", customer: "رانيا وليد", restaurant: "بيتزا فورنو", value: "EGP 310", status: "pending", channel: "web", date: "2025-05-05 13:20" },
];

const statusColors = {
  active: { bg: "#eaf3de", text: "#3b6d11", border: "#97c459" },
  inactive: { bg: "#f1efe8", text: "#5f5e5a", border: "#b4b2a9" },
  pending: { bg: "#faeeda", text: "#854f0b", border: "#ef9f27" },
  suspended: { bg: "#fcebeb", text: "#a32d2d", border: "#f09595" },
  delivered: { bg: "#eaf3de", text: "#3b6d11", border: "#97c459" },
  preparing: { bg: "#faeeda", text: "#854f0b", border: "#ef9f27" },
  cancelled: { bg: "#fcebeb", text: "#a32d2d", border: "#f09595" },
  open: { bg: "#fcebeb", text: "#a32d2d", border: "#f09595" },
  resolved: { bg: "#eaf3de", text: "#3b6d11", border: "#97c459" },
  escalated: { bg: "#f5c4b3", text: "#993c1d", border: "#d85a30" },
  high: { bg: "#faeeda", text: "#854f0b", border: "#ef9f27" },
  critical: { bg: "#fcebeb", text: "#a32d2d", border: "#f09595" },
  medium: { bg: "#e6f1fb", text: "#185fa5", border: "#85b7eb" },
};

function Badge({ status, label }) {
  const c = statusColors[status] || statusColors.inactive;
  return (
    <span style={{ background: c.bg, color: c.text, border: `0.5px solid ${c.border}`, borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function StarRating({ value }) {
  return (
    <span style={{ color: "#ba7517", fontSize: 13, fontWeight: 500 }}>
      {"★".repeat(Math.floor(value))}{"☆".repeat(5 - Math.floor(value))} {value}
    </span>
  );
}

export default function App() {
  const [lang, setLang] = useState("ar");
  const [page, setPage] = useState("dashboard");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantTab, setRestaurantTab] = useState("menu");
  const [searchQ, setSearchQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const T = lang === "ar" ? AR : EN;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const isAr = lang === "ar";

  const filteredRestaurants = restaurants.filter(r => {
    const name = isAr ? r.name : r.nameEn;
    const matchSearch = name.toLowerCase().includes(searchQ.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const navItems = [
    { key: "dashboard", icon: "◈", label: T.dashboard },
    { key: "restaurants", icon: "⊞", label: T.restaurants },
    { key: "orders", icon: "◎", label: T.orders },
    { key: "complaints", icon: "⊗", label: T.complaints },
    { key: "customers", icon: "◉", label: T.customers },
  ];

  const totalActive = restaurants.filter(r => r.status === "active").length;
  const totalOrders = restaurants.reduce((s, r) => s + r.orders, 0);
  const openComplaints = complaintsData.filter(c => c.status === "open" || c.status === "escalated").length;

  function MetricCard({ label, value, sub, accent }) {
    return (
      <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "16px 20px", flex: 1, minWidth: 120 }}>
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 500, color: accent || "var(--color-text-primary)" }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>{sub}</div>}
      </div>
    );
  }

  function RestaurantList() {
    return (
      <div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            placeholder={T.search}
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            style={{ flex: 1, minWidth: 180, fontSize: 14, padding: "8px 14px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", outline: "none" }}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ fontSize: 13, padding: "8px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)" }}>
            <option value="all">{T.allStatus}</option>
            <option value="active">{T.active}</option>
            <option value="pending">{T.pending}</option>
            <option value="suspended">{T.suspended}</option>
          </select>
          <button onClick={() => {}} style={{ background: "#c8a96e", color: "#26215c", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
            + {T.addRestaurant}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
          {filteredRestaurants.map(r => (
            <div key={r.id}
              onClick={() => { setSelectedRestaurant(r); setPage("restaurant-detail"); setRestaurantTab("menu"); }}
              style={{ background: "var(--color-background-primary)", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)", padding: "16px", cursor: "pointer", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-border-secondary)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-border-tertiary)"}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 10, background: r.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: r.color, flexShrink: 0 }}>
                  {r.logo}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 500, fontSize: 15 }}>{isAr ? r.name : r.nameEn}</span>
                    <Badge status={r.status} label={T[r.status]} />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>
                    {isAr ? r.cuisine : r.cuisineEn} · {isAr ? r.city : r.cityEn}
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{r.orders.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{T.orders}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{r.menuItems}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{T.items}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: r.complaints > 0 ? "#a32d2d" : "#3b6d11" }}>{r.complaints}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{T.complaints}</div>
                </div>
              </div>
              <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <StarRating value={r.rating} />
                <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{isAr ? r.lastOrder : r.lastOrderEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function RestaurantDetail() {
    const r = selectedRestaurant;
    if (!r) return null;
    const tabs = [
      { key: "menu", label: T.menu },
      { key: "orders", label: T.orders },
      { key: "complaints", label: T.complaints },
      { key: "conversations", label: T.conversations },
    ];
    return (
      <div>
        <button onClick={() => setPage("restaurants")} style={{ fontSize: 13, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", padding: "0 0 16px", display: "flex", alignItems: "center", gap: 6 }}>
          {isAr ? "→" : "←"} {T.back}
        </button>
        <div style={{ background: "var(--color-background-primary)", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)", padding: "20px", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: r.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: r.color }}>
              {r.logo}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 20, fontWeight: 500 }}>{isAr ? r.name : r.nameEn}</span>
                <Badge status={r.status} label={T[r.status]} />
              </div>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4 }}>
                {isAr ? r.cuisine : r.cuisineEn} · {isAr ? r.city : r.cityEn} · {r.phone}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center", padding: "8px 16px", background: "var(--color-background-secondary)", borderRadius: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{r.orders.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{T.orders}</div>
              </div>
              <div style={{ textAlign: "center", padding: "8px 16px", background: "var(--color-background-secondary)", borderRadius: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{r.revenue}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Revenue</div>
              </div>
              <div style={{ textAlign: "center", padding: "8px 16px", background: "var(--color-background-secondary)", borderRadius: 8 }}>
                <StarRating value={r.rating} />
                <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{T.rating}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 18, borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setRestaurantTab(t.key)}
              style={{ padding: "10px 20px", fontSize: 14, fontWeight: restaurantTab === t.key ? 500 : 400, color: restaurantTab === t.key ? "var(--color-text-primary)" : "var(--color-text-secondary)", background: "none", border: "none", borderBottom: restaurantTab === t.key ? "2px solid #c8a96e" : "2px solid transparent", cursor: "pointer", transition: "all 0.15s" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {restaurantTab === "menu" && (
          <div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                  <th style={{ textAlign: isAr ? "right" : "left", padding: "8px 12px", fontWeight: 500, color: "var(--color-text-secondary)", fontSize: 12 }}>الاسم / Name</th>
                  <th style={{ textAlign: isAr ? "right" : "left", padding: "8px 12px", fontWeight: 500, color: "var(--color-text-secondary)", fontSize: 12 }}>{T.category}</th>
                  <th style={{ textAlign: isAr ? "right" : "left", padding: "8px 12px", fontWeight: 500, color: "var(--color-text-secondary)", fontSize: 12 }}>{T.price}</th>
                  <th style={{ textAlign: isAr ? "right" : "left", padding: "8px 12px", fontWeight: 500, color: "var(--color-text-secondary)", fontSize: 12 }}>{T.availability}</th>
                </tr>
              </thead>
              <tbody>
                {menuItemsData.map(item => (
                  <tr key={item.id} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ fontWeight: 500 }}>{isAr ? item.name : item.nameEn}</div>
                      <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{isAr ? item.nameEn : item.name}</div>
                    </td>
                    <td style={{ padding: "10px 12px", color: "var(--color-text-secondary)", fontSize: 13 }}>
                      {isAr ? item.category : item.categoryEn}
                    </td>
                    <td style={{ padding: "10px 12px", fontWeight: 500 }}>EGP {item.price}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <Badge status={item.available ? "active" : "suspended"} label={item.available ? T.available : T.unavailable} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {restaurantTab === "orders" && <OrdersTable filter={r.name} />}
        {restaurantTab === "complaints" && <ComplaintsTable filter={isAr ? r.name : r.nameEn} />}
        {restaurantTab === "conversations" && (
          <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "24px", textAlign: "center", color: "var(--color-text-secondary)", fontSize: 14 }}>
            محادثات الوكيل الصوتي ستظهر هنا · Voice agent conversations will appear here
          </div>
        )}
      </div>
    );
  }

  function OrdersTable({ filter }) {
    const data = filter ? ordersData.filter(o => o.restaurant.includes(filter) || o.restaurant === filter) : ordersData;
    const statusMap = { delivered: "delivered", preparing: "pending", cancelled: "suspended", pending: "pending" };
    return (
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
              {["Order ID", "Customer / العميل", "Restaurant", "Value", "Channel", "Status", "Date"].map(h => (
                <th key={h} style={{ textAlign: isAr ? "right" : "left", padding: "8px 10px", fontWeight: 500, color: "var(--color-text-secondary)", fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data.length ? data : ordersData).map(o => (
              <tr key={o.id} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                <td style={{ padding: "10px 10px", fontFamily: "monospace", fontSize: 13, color: "var(--color-text-secondary)" }}>{o.id}</td>
                <td style={{ padding: "10px 10px", fontWeight: 500 }}>{o.customer}</td>
                <td style={{ padding: "10px 10px", fontSize: 13 }}>{o.restaurant}</td>
                <td style={{ padding: "10px 10px", fontWeight: 500, color: "#3b6d11" }}>{o.value}</td>
                <td style={{ padding: "10px 10px" }}>
                  <span style={{ fontSize: 12, background: "var(--color-background-secondary)", padding: "2px 8px", borderRadius: 5 }}>{o.channel}</span>
                </td>
                <td style={{ padding: "10px 10px" }}>
                  <Badge status={statusMap[o.status] || "inactive"} label={o.status} />
                </td>
                <td style={{ padding: "10px 10px", fontSize: 12, color: "var(--color-text-secondary)" }}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function ComplaintsTable({ filter }) {
    const data = filter
      ? complaintsData.filter(c => c.restaurant === filter || c.restaurantEn === filter)
      : complaintsData;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(data.length ? data : complaintsData).map(c => (
          <div key={c.id} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontWeight: 500 }}>{c.customer}</span>
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{c.phone}</span>
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>· {isAr ? c.restaurant : c.restaurantEn}</span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Badge status={c.priority} label={c.priority} />
                <Badge status={c.status} label={c.status} />
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{c.date}</span>
              </div>
            </div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              {isAr ? c.issue : c.issueEn}
              <span style={{ fontSize: 13, color: "var(--color-text-secondary)", marginRight: 8, marginLeft: 8 }}>
                — {isAr ? c.issueEn : c.issue}
              </span>
            </div>
            {c.status !== "resolved" && (
              <button style={{ fontSize: 12, color: "#3b6d11", background: "#eaf3de", border: "0.5px solid #97c459", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}>
                {T.resolve}
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  function Dashboard() {
    return (
      <div>
        <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
          <MetricCard label={T.totalRestaurants} value={restaurants.length} sub={`${totalActive} ${T.active}`} />
          <MetricCard label={T.activeToday} value={totalActive} accent="#3b6d11" />
          <MetricCard label={T.totalOrders} value={totalOrders.toLocaleString()} sub="All time" />
          <MetricCard label={T.openComplaints} value={openComplaints} accent={openComplaints > 3 ? "#a32d2d" : "#854f0b"} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
          <div style={{ background: "var(--color-background-primary)", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)", padding: "18px" }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Top Restaurants · أفضل المطاعم</div>
            {restaurants.sort((a, b) => b.orders - a.orders).slice(0, 4).map((r, i) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: r.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: r.color }}>{r.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{isAr ? r.name : r.nameEn}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{isAr ? r.lastOrder : r.lastOrderEn}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#3b6d11" }}>{r.orders.toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--color-background-primary)", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)", padding: "18px" }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Recent Complaints · شكاوى حديثة</div>
            {complaintsData.filter(c => c.status !== "resolved").slice(0, 4).map((c, i) => (
              <div key={c.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < 2 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: statusColors[c.status]?.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: statusColors[c.status]?.text, fontWeight: 600 }}>!</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{c.customer} · <span style={{ fontWeight: 400, color: "var(--color-text-secondary)" }}>{isAr ? c.restaurant : c.restaurantEn}</span></div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{isAr ? c.issue.substring(0, 40) + "..." : c.issueEn.substring(0, 40) + "..."}</div>
                </div>
                <Badge status={c.status} label={c.status} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--color-background-primary)", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)", padding: "18px" }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Latest Orders · آخر الطلبات</div>
          <OrdersTable />
        </div>
      </div>
    );
  }

  return (
    <div dir={dir} style={{ display: "flex", minHeight: "100vh", fontFamily: isAr ? "'Cairo', 'Segoe UI', sans-serif" : "'DM Sans', 'Segoe UI', sans-serif", background: "var(--color-background-tertiary)", fontSize: 14 }}>

      {/* Sidebar */}
      <div style={{ width: sidebarOpen ? 220 : 60, flexShrink: 0, background: "#1a1a2e", transition: "width 0.2s", display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ padding: "20px 16px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#c8a96e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#1a1a2e", flexShrink: 0 }}>P</div>
          {sidebarOpen && <span style={{ color: "#c8a96e", fontWeight: 600, fontSize: 16, letterSpacing: 1 }}>PolyDial</span>}
        </div>
        <div style={{ height: "0.5px", background: "#ffffff18", margin: "0 12px 12px" }} />
        <nav style={{ flex: 1, padding: "0 8px" }}>
          {navItems.map(n => (
            <button key={n.key} onClick={() => { setPage(n.key); setSelectedRestaurant(null); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 8, border: "none", marginBottom: 2, cursor: "pointer", transition: "background 0.15s", background: page === n.key || (page === "restaurant-detail" && n.key === "restaurants") ? "#c8a96e22" : "transparent", color: page === n.key || (page === "restaurant-detail" && n.key === "restaurants") ? "#c8a96e" : "#ffffff88", textAlign: isAr ? "right" : "left" }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{n.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 13, fontWeight: 500 }}>{n.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 16px", borderTop: "0.5px solid #ffffff18", display: "flex", gap: 6 }}>
          <button onClick={() => setLang("ar")} style={{ flex: 1, padding: "6px", borderRadius: 6, border: "0.5px solid", borderColor: lang === "ar" ? "#c8a96e" : "#ffffff22", background: lang === "ar" ? "#c8a96e22" : "transparent", color: lang === "ar" ? "#c8a96e" : "#ffffff55", fontSize: 12, cursor: "pointer" }}>ع</button>
          {sidebarOpen && <button onClick={() => setLang("en")} style={{ flex: 1, padding: "6px", borderRadius: 6, border: "0.5px solid", borderColor: lang === "en" ? "#c8a96e" : "#ffffff22", background: lang === "en" ? "#c8a96e22" : "transparent", color: lang === "en" ? "#c8a96e" : "#ffffff55", fontSize: 12, cursor: "pointer" }}>EN</button>}
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ height: 56, background: "var(--color-background-primary)", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", alignItems: "center", padding: "0 24px", gap: 16 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)", fontSize: 18, padding: 4 }}>≡</button>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>
              {page === "dashboard" && T.dashboard}
              {page === "restaurants" && T.restaurants}
              {page === "orders" && T.orders}
              {page === "complaints" && T.complaints}
              {page === "customers" && T.customers}
              {page === "restaurant-detail" && (selectedRestaurant ? (isAr ? selectedRestaurant.name : selectedRestaurant.nameEn) : "")}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#63c05b" }} />
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>PolyDial Admin</span>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#c8a96e22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#c8a96e" }}>A</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          {page === "dashboard" && <Dashboard />}
          {page === "restaurants" && <RestaurantList />}
          {page === "orders" && <OrdersTable />}
          {page === "complaints" && <ComplaintsTable />}
          {page === "customers" && (
            <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "24px", textAlign: "center", color: "var(--color-text-secondary)" }}>
              Customer management view — قادمًا قريبًا
            </div>
          )}
          {page === "restaurant-detail" && <RestaurantDetail />}
        </div>
      </div>
    </div>
  );
}
