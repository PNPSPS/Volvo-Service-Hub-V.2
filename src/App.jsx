import React, { useState, useEffect } from 'react';
import { 
  Car, Calendar as CalendarIcon, Clock, User, Phone, MessageCircle, 
  CheckCircle2, ChevronRight, MapPin, Wrench, Sparkles, 
  ShieldCheck, AlertCircle, CalendarDays, Star, LogOut,
  UserPlus, Bell, ChevronLeft, Info, Settings, ArrowRight,
  Eye, EyeOff, Cpu, BatteryCharging, Plus, Trash2,
  Coffee, Zap, Activity, Check, Users
} from 'lucide-react';

const INITIAL_SERVICE_STEPS = [
  { id: 1, title: 'รับรถเข้าศูนย์', desc: 'ตรวจสอบเอกสารและรับกุญแจ', icon: MapPin },
  { id: 2, title: 'ตรวจเช็คสภาพ', desc: 'ช่างกำลังประเมินและวิเคราะห์', icon: Wrench },
  { id: 3, title: 'กำลังซ่อมบำรุง', desc: 'ดำเนินการแก้ไขตามรายการ', icon: Car },
  { id: 4, title: 'ทำความสะอาด', desc: 'ล้างรถและทำความสะอาดภายใน', icon: Sparkles },
  { id: 5, title: 'พร้อมส่งมอบ', desc: 'รอให้ลูกค้ามารับรถ', icon: ShieldCheck },
];

// เปลี่ยนจากค่าคงที่เป็น Initial Data เพื่อนำไปใส่ใน State ให้แก้ไขได้
const INITIAL_TECHNICIANS = [
  { id: 'tech1', username: 'tech1', password: '123', name: 'ช่างต้น', role: 'Senior Technician', rating: 4.9, expertise: 'ระบบไฟฟ้าและเครื่องยนต์', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'tech2', username: 'tech2', password: '123', name: 'ช่างคิว', role: 'Diagnostic Specialist', rating: 4.8, expertise: 'วิเคราะห์ระบบคอมพิวเตอร์รถ', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'tech3', username: 'tech3', password: '123', name: 'ช่างซ่า', role: 'Maintenance Expert', rating: 4.9, expertise: 'ช่วงล่างและระบบเบรก', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'tech4', username: 'tech4', password: '123', name: 'ช่างแม็ก', role: 'General Technician', rating: 4.7, expertise: 'ดูแลรักษาและซ่อมบำรุงทั่วไป', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'admin', username: 'admin', password: '123', name: 'คุณเพิร์ธ (Manager)', role: 'Service Manager', rating: 5.0, expertise: 'บริหารจัดการศูนย์บริการ', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200' },
];

const CUSTOMER_DB = [
  { id: 'c1', name: 'คุณสมเกียรติ ใจดี', phone: '081-111-1111', email: 'somkiat@volvo.com', lineId: '@somkiat_v', licensePlate: 'กท 9999', model: 'XC60 Recharge', vin: 'YV1DZ...', nextServiceKm: 20000, nextServiceDays: 30 },
  { id: 'c2', name: 'คุณนภัสสร รุ่งเรือง', phone: '089-222-2222', email: 'napat@volvo.com', lineId: '@napat.r', licensePlate: 'ขต 5555', model: 'EX30', vin: 'YV1EX...', nextServiceKm: 15000, nextServiceDays: 180 }
];

const INITIAL_JOBS = [
  { jobId: 'J001', customerId: 'c1', licensePlate: 'กท 9999', team: ['tech1', 'tech3'], currentStepId: 3, notes: [], specialStatus: null, totalEstimatedMinutes: 120, reqLounge: true, reqEV: true },
  { jobId: 'J002', customerId: 'c2', licensePlate: 'ขต 5555', team: ['tech2'], currentStepId: 2, notes: [], specialStatus: null, totalEstimatedMinutes: 90, reqLounge: false, reqEV: true }
];

const INITIAL_SERVICES = [
  { id: 's1', name: 'เช็คระยะมาตรฐาน (10,000 km)', estimatedMinutes: 60 },
  { id: 's2', name: 'เช็คระยะชุดใหญ่ (20,000 km)', estimatedMinutes: 120 },
  { id: 's3', name: 'เปลี่ยนถ่ายน้ำมันเครื่องและไส้กรอง', estimatedMinutes: 45 },
  { id: 's4', name: 'ตรวจเช็คช่วงล่างและระบบเบรก', estimatedMinutes: 90 },
  { id: 's5', name: 'วิเคราะห์ปัญหาระบบคอมพิวเตอร์ (VIDA)', estimatedMinutes: 60 },
];

const MOCK_BOOKINGS = [
  { id: 'b1', date: new Date().toISOString().split('T')[0], time: '10:00', licensePlate: 'ชจ 1122', customerName: 'คุณสมหญิง', phone: '082-123-4567', service: 'เช็คระยะชุดใหญ่ (20,000 km)', estimatedMinutes: 120, team: ['tech1', 'tech3'], reqLounge: true, reqEV: false },
  { id: 'b2', date: new Date().toISOString().split('T')[0], time: '14:00', licensePlate: 'ฮฮ 5555', customerName: 'คุณประเสริฐ', phone: '081-987-6543', service: 'เปลี่ยนถ่ายน้ำมันเครื่องและไส้กรอง', estimatedMinutes: 45, team: [], reqLounge: false, reqEV: false },
  { id: 'b3', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '09:00', licensePlate: 'วว 9876', customerName: 'คุณมานี', phone: '089-111-2222', service: 'ตรวจเช็คช่วงล่างและระบบเบรก', estimatedMinutes: 90, team: [], reqLounge: true, reqEV: true }
];

const getMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

export default function App() {
  const [authMode, setAuthMode] = useState('welcome');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentStaff, setCurrentStaff] = useState(null);
  
  const [activeTab, setActiveTab] = useState('tracking');
  const [staffTab, setStaffTab] = useState('active'); 
  
  // State ฐานข้อมูลหลัก
  const [technicians, setTechnicians] = useState(INITIAL_TECHNICIANS); // ระบบทีมช่างใหม่
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [customers, setCustomers] = useState(CUSTOMER_DB);
  const [activeJobs, setActiveJobs] = useState(INITIAL_JOBS);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [staffLogin, setStaffLogin] = useState({ username: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', phone: '', email: '', lineId: '', licensePlate: '', model: '', vin: '' });

  const [bookingStep, setBookingStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reqLounge, setReqLounge] = useState(false);
  const [reqEV, setReqEV] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [staffMonthDate, setStaffMonthDate] = useState(new Date());
  const [staffSelectedDate, setStaffSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [pendingAlerts, setPendingAlerts] = useState([]);
  const [showContactPST, setShowContactPST] = useState(false);
  
  const [pstMonthDate, setPstMonthDate] = useState(new Date());
  const [monthlyTeams, setMonthlyTeams] = useState({
    [getMonthKey(new Date())]: [
      { id: 'teamA', name: 'PST Team A', techs: ['tech1', 'tech3'] },
      { id: 'teamB', name: 'PST Team B', techs: ['tech2', 'tech4'] }
    ]
  });

  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progressAngle, setProgressAngle] = useState(0);

  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceTime, setNewServiceTime] = useState(60);

  useEffect(() => {
    if (authMode === 'app' && currentUser) {
      const job = activeJobs.find(j => j.customerId === currentUser.id);
      if (job) {
        const targetAngle = (job.currentStepId / 5) * 360;
        let current = progressAngle;
        const animate = () => {
          if (current < targetAngle) {
            current += 5;
            setProgressAngle(Math.min(current, targetAngle));
            requestAnimationFrame(animate);
          } else if (current > targetAngle) {
            current -= 5;
            setProgressAngle(Math.max(current, targetAngle));
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }
  }, [authMode, currentUser, activeJobs]);


  const handleCustomerLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const customer = customers.find(c => c.email.toLowerCase() === loginEmail.toLowerCase());
    if (customer && customer.licensePlate.replace(/\s/g, '') === loginPassword.replace(/\s/g, '')) {
      setCurrentUser(customer);
      setAuthMode('app');
      setLoginEmail(''); setLoginPassword('');
    } else {
      setLoginError('อีเมลหรือรหัสผ่าน (ทะเบียนรถ) ไม่ถูกต้อง');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newCustomer = { id: `c${customers.length + 1}`, ...regForm, nextServiceKm: 10000, nextServiceDays: 180 };
    setCustomers([...customers, newCustomer]);
    setCurrentUser(newCustomer);
    setAuthMode('app');
  };

  const handleStaffLogin = (e) => {
    e.preventDefault();
    // ดึงค่าการล็อกอินจาก State ที่แอดมินแก้ไขได้ (Dynamic Login)
    const tech = technicians.find(t => t.username === staffLogin.username);
    if (tech && tech.password === staffLogin.password) {
      setCurrentStaff(tech);
      setAuthMode('staffDashboard');
    } else {
      alert('Username หรือ Password ไม่ถูกต้อง');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentStaff(null);
    setAuthMode('welcome');
    setActiveTab('tracking');
    setStaffTab('active');
  };

  const handleUpdateNextService = (customerId, km, days) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, nextServiceKm: km, nextServiceDays: days } : c));
  };
  
  const handleAddNote = (jobId, stepId, text) => {
    if(!text) return;
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setActiveJobs(jobs => jobs.map(j => j.jobId === jobId ? {...j, notes: [...(j.notes || []), {stepId, text, timestamp: timeString}]} : j));
  };

  const handleStartBooking = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    let customer = customers.find(c => c.licensePlate === booking.licensePlate);
    if (!customer) {
      customer = {
        id: `c${Date.now()}`, name: booking.customerName, phone: booking.phone, email: 'dropoff@volvo.com', 
        lineId: '-', licensePlate: booking.licensePlate, model: 'Volvo (Walk-in/Drop)', vin: '-', nextServiceKm: 10000, nextServiceDays: 180
      };
      setCustomers(prev => [...prev, customer]);
    }

    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newJob = {
      jobId: `J${Math.floor(Math.random() * 900) + 100}`,
      customerId: customer.id,
      licensePlate: booking.licensePlate,
      team: booking.team && booking.team.length > 0 ? booking.team : [currentStaff.id],
      currentStepId: 1,
      totalEstimatedMinutes: booking.estimatedMinutes || 60,
      reqLounge: booking.reqLounge || false,
      reqEV: booking.reqEV || false,
      notes: [{stepId: 1, text: `ลูกค้านำรถมา Drop-off ล่วงหน้า (บริการ: ${booking.service})`, timestamp: timeString}],
      specialStatus: null
    };

    setActiveJobs(prev => [newJob, ...prev]);
    setBookings(prev => prev.filter(b => b.id !== bookingId)); 
    setStaffTab('active'); 
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendarDays = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push({ empty: true });
    const today = new Date(); today.setHours(0,0,0,0);

    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(year, month, i);
      const isPast = dateObj < today;
      const isSunday = dateObj.getDay() === 0;
      const isFull = i === 15 || i === 22; 
      
      let status = 'available';
      if (isPast || isSunday) status = 'closed';
      else if (isFull) status = 'full';

      days.push({ date: i, fullDate: dateObj, status });
    }
    return days;
  };

  const renderAuthScreens = () => {
    if (authMode === 'welcome') {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#050B14]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 animate-[zoomInOut_30s_infinite_alternate]"
            style={{backgroundImage: 'url("https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=1920&h=1080")'}}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/80 to-transparent"></div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white tracking-widest mb-2 drop-shadow-lg">VOLVO</h1>
              <p className="text-blue-300 font-medium">Personal Service Hub</p>
            </div>
            
            <form onSubmit={handleCustomerLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">อีเมลผู้ใช้งาน</label>
                <input 
                  type="email" placeholder="เช่น somkiat@volvo.com" value={loginEmail} onChange={(e) => {setLoginEmail(e.target.value); setLoginError('');}} required
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">รหัสผ่าน (หมายเลขทะเบียนรถ)</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} placeholder="เช่น กท 9999" value={loginPassword} onChange={(e) => {setLoginPassword(e.target.value); setLoginError('');}} required
                    className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              {loginError && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                  <AlertCircle size={16} /> {loginError}
                </div>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                เข้าสู่ระบบ (Login)
              </button>
            </form>

            <div className="mt-8 flex flex-col gap-4">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/20 w-full absolute"></div>
                <span className="bg-[#050B14] px-4 text-sm text-slate-400 relative z-10 rounded-full border border-white/10">สำหรับลูกค้าใหม่</span>
              </div>
              <button onClick={() => setAuthMode('register')} className="w-full bg-white/5 text-white border border-white/20 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors flex justify-center items-center gap-2">
                <UserPlus size={20} /> ลงทะเบียนข้อมูลลูกค้าใหม่
              </button>
            </div>

            <button onClick={() => setAuthMode('staffLogin')} className="mt-8 text-sm text-slate-500 hover:text-blue-400 w-full text-center transition-colors">
              Staff Portal Access
            </button>
          </div>
        </div>
      );
    }

    if (authMode === 'register') {
      return (
        <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-6 relative">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl shadow-2xl border border-white/10 animate-in slide-in-from-bottom-8">
            <button onClick={() => setAuthMode('welcome')} className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 transition-colors">
              <ChevronLeft size={20} /> กลับไปหน้าล็อกอิน
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">ลงทะเบียนข้อมูลลูกค้าใหม่</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ชื่อ-นามสกุล</label>
                  <input type="text" required value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">อีเมล</label>
                  <input type="email" required value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">เบอร์โทรศัพท์</label>
                  <input type="tel" required value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Line ID</label>
                  <input type="text" value={regForm.lineId} onChange={e => setRegForm({...regForm, lineId: e.target.value})} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">รุ่นรถยนต์</label>
                  <input type="text" placeholder="เช่น XC60" required value={regForm.model} onChange={e => setRegForm({...regForm, model: e.target.value})} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ป้ายทะเบียน (ใช้เป็นรหัสผ่าน)</label>
                  <input type="text" placeholder="เช่น กท 9999" required value={regForm.licensePlate} onChange={e => setRegForm({...regForm, licensePlate: e.target.value})} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1">เลขตัวถัง (VIN)</label>
                  <input type="text" required value={regForm.vin} onChange={e => setRegForm({...regForm, vin: e.target.value})} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none uppercase focus:border-blue-500" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition-colors mt-6 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                บันทึกข้อมูลและเข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      );
    }

    if (authMode === 'staffLogin') {
      return (
        <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-6 relative">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-8">
             <button onClick={() => setAuthMode('welcome')} className="text-slate-500 hover:text-white mb-6 flex items-center gap-2 transition-colors">
              <ChevronLeft size={20} /> กลับ
            </button>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center rotate-3 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                <Wrench size={32} className="text-white -rotate-3" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white text-center mb-6 tracking-widest">STAFF TERMINAL</h2>
            <form onSubmit={handleStaffLogin} className="space-y-4">
              <input type="text" placeholder="Username (เช่น admin / tech1)" required value={staffLogin.username} onChange={e => setStaffLogin({...staffLogin, username: e.target.value})} className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-blue-500 outline-none" />
              <input type="password" placeholder="Password" required value={staffLogin.password} onChange={e => setStaffLogin({...staffLogin, password: e.target.value})} className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-blue-500 outline-none" />
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">Access Terminal</button>
            </form>
          </div>
        </div>
      );
    }
  };

  const renderCustomerSidebar = () => (
    <aside className="hidden md:flex flex-col w-72 bg-[#050B14] text-white shadow-2xl z-20 shrink-0 border-r border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-3xl"></div>
        <div className="p-8 pb-4 relative z-10">
           <h1 className="text-3xl font-bold tracking-widest mb-1 text-white drop-shadow-md">VOLVO</h1>
           <p className="text-blue-400 text-sm font-medium">Personal Service Hub</p>
        </div>

        <nav className="px-4 py-6 space-y-2 flex-1 relative z-10">
          {[
            { id: 'tracking', label: 'สถานะบริการ', icon: Car },
            { id: 'booking', label: 'จองคิวล่วงหน้า', icon: CalendarDays },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={24} className={activeTab === 'tracking' && item.id === 'tracking' ? 'animate-[pulse_2s_infinite]' : ''} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-white/5 m-4 rounded-2xl border border-white/10 relative z-10 backdrop-blur-md">
           <p className="text-xs text-slate-400 mb-2">เข้าสู่ระบบในชื่อ</p>
           <p className="font-bold truncate text-white">{currentUser.name}</p>
           <p className="text-sm text-blue-400">{currentUser.licensePlate}</p>
           <button onClick={handleLogout} className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-red-500/10 rounded-xl text-sm font-semibold hover:bg-red-500/20 text-red-400 transition-colors">
             <LogOut size={16} /> ออกจากระบบ
           </button>
        </div>
    </aside>
  );

  const renderTracking = () => {
    const myJob = activeJobs.find(j => j.customerId === currentUser.id);

    if (!myJob) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in duration-500 p-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
            <Car size={80} className="text-blue-600 relative z-10 animate-[bounce_3s_infinite_ease-in-out]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">รถของคุณพร้อมใช้งาน</h2>
            <p className="text-slate-500 max-w-sm mx-auto">ยังไม่มีคิวซ่อมบำรุงในขณะนี้ หากต้องการรับบริการสามารถจองคิวล่วงหน้าได้เลยครับ</p>
          </div>
          <button onClick={() => setActiveTab('booking')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105 flex items-center gap-2">
            จองคิวรับบริการ <ArrowRight size={20} />
          </button>
        </div>
      );
    }

    const assignedTechs = myJob.team.map(id => technicians.find(t => t.id === id)).filter(Boolean);
    
    const baseMinutes = myJob.totalEstimatedMinutes || 120;
    const remainingSteps = 5 - myJob.currentStepId;
    const estimatedMinutesLeft = Math.round((baseMinutes / 4) * remainingSteps);
    const estimatedTime = myJob.currentStepId < 5 ? `${estimatedMinutesLeft} นาที` : 'พร้อมรับรถ';
    
    const progressPercent = (myJob.currentStepId / 5) * 100;

    return (
      <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in duration-500">
        
        {/* Dynamic Header & Hologram Progress */}
        <div className="bg-gradient-to-br from-[#050B14] to-blue-900 rounded-3xl p-6 md:p-8 shadow-2xl text-white relative overflow-hidden border border-blue-800/50">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div>
                <p className="text-blue-300 font-medium mb-1">{greeting}</p>
                <h2 className="text-3xl font-bold mb-1">{currentUser.model}</h2>
                <p className="text-xl opacity-90 font-mono tracking-wider bg-white/10 inline-block px-3 py-1 rounded-lg border border-white/20">{currentUser.licensePlate}</p>
              </div>
              
              <div className="flex items-center gap-6 bg-black/30 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                 <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* SVG Hologram Ring */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="283" strokeDashoffset={283 - (283 * progressAngle) / 360} className="transition-all duration-300 ease-out" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                       <span className="text-xl font-bold">{Math.round(progressPercent)}%</span>
                    </div>
                 </div>
                 <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">เวลาแล้วเสร็จโดยประมาณ</p>
                    <p className="text-2xl font-bold text-blue-400">{estimatedTime}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Feature 2: Automated Vehicle Health Report (โชว์เมื่อเข้าถึงขั้นตอนที่ 2 ขึ้นไป) */}
        {myJob.currentStepId >= 2 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center animate-in slide-in-from-bottom-4">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Activity size={32} />
             </div>
             <div className="flex-1 w-full">
                <h3 className="text-lg font-bold text-slate-800 mb-1">รายงานสุขภาพรถยนต์ (Auto-Check)</h3>
                <p className="text-sm text-slate-500 mb-4">ระบบวิเคราะห์ข้อมูลจากตัวรถอัตโนมัติ</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                   <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full"><Check size={14}/></div>
                      <span className="text-xs font-bold text-slate-700">แบตเตอรี่ไฮบริด 98%</span>
                   </div>
                   <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full"><Check size={14}/></div>
                      <span className="text-xs font-bold text-slate-700">ซอฟต์แวร์ล่าสุด 2.14</span>
                   </div>
                   <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full"><Check size={14}/></div>
                      <span className="text-xs font-bold text-slate-700">ระบบเบรกสมบูรณ์</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {myJob.specialStatus && (
          <div className="bg-amber-500/10 border border-amber-500 p-5 rounded-2xl flex gap-4 items-start shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-in slide-in-from-top-4">
            <div className="bg-amber-500 text-white p-2 rounded-full shrink-0 animate-pulse"><AlertCircle size={24} /></div>
            <div>
              <h3 className="font-bold text-amber-600 text-lg">สถานะพิเศษ: {myJob.specialStatus.type}</h3>
              <p className="text-amber-700/80 font-medium mt-1">{myJob.specialStatus.reason}</p>
            </div>
          </div>
        )}

        {/* Handover Pass */}
        {myJob.currentStepId === 5 && !myJob.specialStatus && (
           <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-1 rounded-3xl animate-[pulse_2s_infinite]">
              <div className="bg-[#050B14] p-8 rounded-[22px] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-amber-500/10"></div>
                 <div className="relative z-10 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2 flex items-center justify-center md:justify-start gap-2">
                       <ShieldCheck size={28} className="text-amber-400"/> DIGITAL HANDOVER PASS
                    </h3>
                    <p className="text-slate-300">รถของคุณพร้อมส่งมอบแล้ว กรุณาแสดงหน้านี้แก่พนักงานต้อนรับ</p>
                 </div>
                 <div className="bg-white p-2 rounded-xl relative z-10 shrink-0">
                    <div className="w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center">
                       <Car size={40} className="text-amber-400"/>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* Tracking Stepper */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-xl font-bold text-slate-800">ขั้นตอนการบริการ</h2>
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-blue-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> LIVE
            </span>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col">
              {INITIAL_SERVICE_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.id < myJob.currentStepId;
                const isCurrent = step.id === myJob.currentStepId;
                const isPending = step.id > myJob.currentStepId;
                const isLast = index === INITIAL_SERVICE_STEPS.length - 1;
                const stepNotes = myJob.notes?.filter(n => n.stepId === step.id) || [];
                
                return (
                  <div key={step.id} className={`relative flex items-start ${!isLast ? 'pb-8 md:pb-12' : ''} transition-all duration-500 ${isPending ? 'opacity-40 grayscale' : ''}`}>
                    
                    {/* Vertical Line perfectly aligned between steps */}
                    {!isLast && (
                        <div className={`absolute left-[26px] md:left-[30px] top-14 md:top-16 bottom-0 w-1 transition-all duration-700 ${isCompleted ? 'bg-blue-500' : 'bg-slate-100'}`}>
                           {isCurrent && (
                              <div className="w-full h-full bg-gradient-to-b from-blue-500 to-slate-100"></div>
                           )}
                        </div>
                    )}

                    <div className={`
                      w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 border-4 border-white transition-all duration-500 relative z-10
                      ${isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 
                        isCurrent ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110' : 
                        'bg-slate-100 text-slate-400'}
                    `}>
                      {isCurrent && <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-[ping_2s_infinite]"></div>}
                      {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} className={isCurrent ? 'animate-bounce' : ''} />}
                    </div>
                    
                    <div className="ml-6 flex-1 pt-1 md:pt-2">
                      <h3 className={`text-lg md:text-xl font-bold ${isCurrent ? 'text-blue-600' : 'text-slate-800'}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{step.desc}</p>
                      
                      {stepNotes.length > 0 && (
                        <div className="mt-4 space-y-3 relative z-20">
                            {stepNotes.map((note, idx) => (
                                <div key={idx} className="bg-[#050B14] text-white p-4 rounded-2xl rounded-tl-sm relative w-fit max-w-[90%] shadow-lg border border-slate-800 animate-in slide-in-from-bottom-2">
                                    <div className="absolute -left-2 top-0 w-4 h-4 bg-[#050B14] border-l border-t border-slate-800 rotate-[-45deg] translate-y-2 translate-x-1"></div>
                                    <p className="text-sm font-medium leading-relaxed">{note.text}</p>
                                    <p className="text-[10px] text-slate-400 mt-2 text-right">{note.timestamp} น.</p>
                                </div>
                            ))}
                        </div>
                      )}

                      {isCurrent && !myJob.specialStatus && (
                        <div className="mt-3 text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg inline-block font-semibold border border-blue-100">
                          กำลังดำเนินการ...
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PST Team Card */}
        {assignedTechs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Personal Service Team (PST)</h3>
             <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex -space-x-4">
                  {assignedTechs.map((tech, idx) => (
                     <img key={tech.id} src={tech.img} alt={tech.name} className={`w-16 h-16 rounded-full border-4 border-white object-cover shadow-md z-[${10-idx}] relative`} />
                  ))}
                  <div className="w-16 h-16 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center flex-col shadow-md z-0 relative">
                     <span className="text-xs font-bold text-slate-500">PST</span>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left px-2">
                   <p className="font-bold text-slate-800">ทีมช่างเทคนิคคู่หู</p>
                   <p className="text-sm text-slate-500">{assignedTechs.map(t=>t.name).join(' & ')}</p>
                </div>
                <button onClick={() => setShowContactPST(true)} className="bg-[#050B14] text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
                   ติดต่อทีมช่าง
                </button>
             </div>
          </div>
        )}

        {/* Contact PST Modal */}
        {showContactPST && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050B14]/60 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-blue-600 p-6 text-center text-white relative">
                   <ShieldCheck size={40} className="mx-auto mb-3 text-blue-200" />
                   <h3 className="text-xl font-bold">ติดต่อทีมช่าง PST</h3>
                   <p className="text-blue-200 text-sm mt-1">พร้อมให้คำปรึกษาและดูแลรถของคุณ</p>
                </div>
                <div className="p-6 space-y-4">
                   <button onClick={() => setShowContactPST(false)} className="w-full flex items-center gap-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 p-4 rounded-2xl transition-colors font-bold text-left shadow-sm">
                      <div className="bg-emerald-500 text-white p-2 rounded-full shrink-0"><MessageCircle size={20} /></div>
                      <div>
                         <p>แชทผ่าน LINE</p>
                         <p className="text-xs font-normal opacity-80 mt-0.5">ตอบกลับภายใน 5 นาที</p>
                      </div>
                   </button>
                   <button onClick={() => setShowContactPST(false)} className="w-full flex items-center gap-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 p-4 rounded-2xl transition-colors font-bold text-left shadow-sm">
                      <div className="bg-blue-600 text-white p-2 rounded-full shrink-0"><Phone size={20} /></div>
                      <div>
                         <p>โทรสายตรง (Direct Call)</p>
                         <p className="text-xs font-normal opacity-80 mt-0.5">02-VOLVO-PST</p>
                      </div>
                   </button>
                   <button onClick={() => setShowContactPST(false)} className="w-full py-3 mt-2 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-200">
                      ปิดหน้าต่าง
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  const renderBooking = () => {
    if (showSuccess) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in duration-500 p-6">
          <div className="w-28 h-28 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-4">
            <CheckCircle2 size={60} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">จองคิวสำเร็จ!</h2>
          <p className="text-slate-500 text-lg max-w-md">ระบบได้บันทึกคิวสำหรับรถ <b>{currentUser.licensePlate}</b> เรียบร้อยแล้ว</p>
          <button onClick={() => {setShowSuccess(false); setBookingStep(1); setActiveTab('tracking');}} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold mt-4 shadow-lg">กลับหน้าสถานะ</button>
        </div>
      );
    }
    
    const dateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    const dayBookings = bookings.filter(b => b.date === dateStr);
    const srv = services.find(s => s.id === selectedServiceId);
    const requiredMinutes = srv ? srv.estimatedMinutes : 60;

    const timeToMins = (timeStr) => {
       if (!timeStr) return 0;
       const [h, m] = timeStr.split(':').map(Number);
       return h * 60 + m;
    };

    const allSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
    const timeSlotsInfo = allSlots.map(time => {
       const slotStart = timeToMins(time);
       const slotEnd = slotStart + requiredMinutes;
       
       const isOverlap = dayBookings.some(b => {
          const bStart = timeToMins(b.time);
          const bEnd = bStart + (b.estimatedMinutes || 60);
          return slotStart < bEnd && slotEnd > bStart;
       });

       return { time, disabled: isOverlap };
    });

    const currentMonthKeyForBooking = getMonthKey(currentMonthDate);
    const teamsForBooking = monthlyTeams[currentMonthKeyForBooking] || [];

    return (
        <div className="max-w-4xl mx-auto w-full space-y-6 animate-in fade-in duration-300">
           {/* Progress Indicator */}
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center px-4 md:px-12 relative">
                <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-10">
                  <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((bookingStep - 1) / 2) * 100}%` }}></div>
                </div>
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center bg-white px-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300 ${bookingStep >= step ? 'bg-[#050B14] text-white shadow-lg scale-110' : 'bg-slate-100 text-slate-400'}`}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {bookingStep === 1 && (
               <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                 
                 <div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-4"><Wrench className="text-blue-600" /> เลือกบริการที่ต้องการ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                       {services.map(s => (
                          <button key={s.id} onClick={() => setSelectedServiceId(s.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedServiceId === s.id ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100' : 'border-slate-100 hover:border-blue-200'}`}>
                             <p className="font-bold text-slate-800">{s.name}</p>
                             <p className="text-sm text-blue-600 mt-1 flex items-center gap-1"><Clock size={14}/> ใช้เวลาประมาณ {s.estimatedMinutes} นาที</p>
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* Feature 1: Volvo Premium Extras */}
                 <div className="border-t border-slate-100 pt-6 mb-8">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-4"><Star className="text-blue-600" /> บริการเสริม (ไม่มีค่าใช้จ่าย)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                       <button onClick={() => setReqLounge(!reqLounge)} className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${reqLounge ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-100' : 'border-slate-100 hover:border-amber-200'}`}>
                          <div className={`p-3 rounded-full ${reqLounge ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}><Coffee size={24}/></div>
                          <div>
                            <p className="font-bold text-slate-800">จอง VIP Lounge</p>
                            <p className="text-xs text-slate-500 mt-1">ลูกค้ารอรับรถที่ศูนย์บริการ (เครื่องดื่ม/ของว่าง)</p>
                          </div>
                       </button>
                       <button onClick={() => setReqEV(!reqEV)} className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${reqEV ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-100' : 'border-slate-100 hover:border-emerald-200'}`}>
                          <div className={`p-3 rounded-full ${reqEV ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}><Zap size={24}/></div>
                          <div>
                            <p className="font-bold text-slate-800">ขอรับบริการชาร์จไฟ EV</p>
                            <p className="text-xs text-slate-500 mt-1">บริการชาร์จแบตเตอรี่เต็ม 100% ก่อนส่งมอบ</p>
                          </div>
                       </button>
                    </div>
                 </div>

                 <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3"><CalendarIcon className="text-blue-600" /> เลือกวันที่รับบริการ</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1))} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600"><ChevronLeft size={20} /></button>
                        <span className="py-2 px-4 bg-[#050B14] text-white rounded-lg font-bold text-sm min-w-[120px] text-center">{currentMonthDate.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}</span>
                        <button onClick={() => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1))} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600"><ChevronRight size={20} /></button>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-7 gap-2 my-6">
                    {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(d => <div key={d} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>)}
                    {generateCalendarDays(currentMonthDate).map((day, idx) => {
                        if (day.empty) return <div key={`e-${idx}`} className="p-2"></div>;
                        const dateStr = day.fullDate.toISOString().split('T')[0];
                        const isSelected = selectedDate && selectedDate.toISOString().split('T')[0] === dateStr;
                        const isClosed = day.status === 'closed';
                        const isFull = day.status === 'full';
                        
                        return (
                            <button 
                                key={idx} 
                                disabled={isClosed || isFull}
                                onClick={() => setSelectedDate(day.fullDate)} 
                                className={`aspect-square rounded-xl flex flex-col items-center justify-center relative font-bold transition-all ${
                                    isSelected ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-300' : 
                                    isClosed ? 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-50' :
                                    isFull ? 'bg-red-50 text-red-300 cursor-not-allowed' :
                                    'bg-white border-2 border-slate-100 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                                }`}
                            >
                                {day.date}
                                {isFull && <span className="absolute w-full h-[2px] bg-red-300 -rotate-45"></span>}
                            </button>
                        );
                    })}
                 </div>

                 <button disabled={!selectedDate || !selectedServiceId} onClick={() => setBookingStep(2)} className="w-full py-4 bg-[#050B14] text-white rounded-xl font-bold disabled:opacity-50 transition-all flex items-center justify-center gap-2">ถัดไป <ChevronRight size={18} /></button>
               </div>
           )}

           {bookingStep === 2 && (
               <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3"><Users className="text-blue-600" /> ระบุทีมช่าง (PST)</h3>
                    <button onClick={() => { setSelectedTechs([]); setBookingStep(3); }} className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">ข้ามขั้นตอนนี้</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamsForBooking.length === 0 ? (
                        <p className="text-sm text-slate-500 col-span-2 text-center py-4">ยังไม่มีการจัดทีมช่างในเดือนนี้</p>
                    ) : (
                        teamsForBooking.map(team => (
                            <button key={team.id} onClick={() => setSelectedTechs(team.techs)} className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedTechs.join(',') === team.techs.join(',') ? 'border-blue-600 shadow-lg ring-4 ring-blue-50 bg-blue-50/20' : 'border-slate-100 hover:border-blue-200'}`}>
                               <div className="flex -space-x-4 mb-4">
                                  {team.techs.map(techId => {
                                      const t = technicians.find(x => x.id === techId);
                                      if(!t) return null;
                                      return <img key={t.id} src={t.img} className="w-16 h-16 rounded-full border-4 border-white shadow-sm relative object-cover" />
                                  })}
                               </div>
                               <h4 className="font-bold text-slate-800 text-lg">{team.name}</h4>
                               <p className="text-sm text-slate-500">{team.techs.map(id => technicians.find(t=>t.id===id)?.name).join(' & ')}</p>
                            </button>
                        ))
                    )}
                 </div>
                 <div className="flex gap-4">
                    <button onClick={() => setBookingStep(1)} className="px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold">ย้อนกลับ</button>
                    <button onClick={() => setBookingStep(3)} className="flex-1 py-4 bg-[#050B14] text-white rounded-xl font-bold flex justify-center items-center gap-2">ถัดไป <ChevronRight size={18} /></button>
                 </div>
               </div>
           )}

           {bookingStep === 3 && (
               <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                 <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3"><Clock className="text-blue-600" /> เลือกเวลาที่สะดวก</h3>
                 <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlotsInfo.map(({ time, disabled }) => (
                      <button 
                        key={time} 
                        disabled={disabled}
                        onClick={() => setSelectedTime(time)} 
                        className={`py-3 flex flex-col items-center justify-center rounded-2xl font-bold border-2 transition-all ${
                          disabled 
                            ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                            : selectedTime === time 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105' 
                              : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                        }`}
                      >
                        <span>{time}</span>
                        {disabled && <span className="text-[10px] font-normal text-red-400 mt-0.5">คิวเต็ม</span>}
                      </button>
                    ))}
                 </div>
                 <div className="bg-[#050B14] p-6 rounded-2xl mt-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">สรุปการจอง รถทะเบียน {currentUser.licensePlate}</p>
                      <p className="text-xl font-bold">{selectedDate?.toLocaleDateString('th-TH', { day: 'numeric', month: 'long' })} เวลา {selectedTime || '-'}</p>
                      <p className="text-blue-400 text-sm mt-1">{services.find(s => s.id === selectedServiceId)?.name}</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                     <button onClick={() => setBookingStep(2)} className="px-6 py-3 bg-white/10 rounded-xl font-bold">กลับ</button>
                     <button disabled={!selectedTime} onClick={() => {
                         const srv = services.find(s => s.id === selectedServiceId);
                         const newBook = {
                             id: `b${Date.now()}`,
                             date: selectedDate.toISOString().split('T')[0],
                             time: selectedTime,
                             licensePlate: currentUser.licensePlate,
                             customerName: currentUser.name,
                             phone: currentUser.phone,
                             service: srv.name,
                             estimatedMinutes: srv.estimatedMinutes,
                             team: selectedTechs,
                             reqLounge: reqLounge,
                             reqEV: reqEV
                         };
                         setBookings(prev => [...prev, newBook]);
                         setPendingAlerts(prev => [...prev, newBook]); 
                         setShowSuccess(true);
                     }} className="flex-1 px-8 py-3 bg-blue-600 rounded-xl font-bold disabled:opacity-50">ยืนยันคิว</button>
                   </div>
                 </div>
               </div>
           )}
        </div>
    );
  };

  const renderStaffDashboard = () => {
    return (
      <div className="flex h-screen bg-[#020617] text-slate-300 font-sans">
        
        {/* Staff Sidebar */}
        <div className="w-64 bg-[#050B14] border-r border-slate-800 flex flex-col p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-widest flex items-center gap-2">
              <Settings size={24} className="text-blue-500 animate-[spin_4s_linear_infinite]" /> STAFF
            </h2>
            <p className="text-[10px] text-blue-500 font-mono mt-1">SECURE TERMINAL V2.0</p>
          </div>
          
          <div className="flex items-center gap-3 mb-8 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <img src={currentStaff.img} className="w-10 h-10 rounded-lg object-cover grayscale opacity-80" alt="" />
            <div>
              <p className="font-bold text-white text-sm">{currentStaff.name}</p>
              <p className="text-[10px] text-emerald-400 font-mono">ONLINE</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1 font-mono text-sm">
            <button onClick={() => setStaffTab('active')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${staffTab === 'active' ? 'bg-blue-900/40 text-blue-400 border border-blue-900' : 'hover:bg-slate-900'}`}>
               <Wrench size={18} /> ACTIVE_JOBS
            </button>
            <button onClick={() => setStaffTab('calendar')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors ${staffTab === 'calendar' ? 'bg-blue-900/40 text-blue-400 border border-blue-900' : 'hover:bg-slate-900'}`}>
               <div className="flex items-center gap-3">
                   <CalendarIcon size={18} /> SCHEDULE
               </div>
               {pendingAlerts.length > 0 && <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]">{pendingAlerts.length} NEW</span>}
            </button>
            {currentStaff.id === 'admin' && (
              <>
                <button onClick={() => setStaffTab('crm')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${staffTab === 'crm' ? 'bg-blue-900/40 text-blue-400 border border-blue-900' : 'hover:bg-slate-900'}`}>
                   <Users size={18} /> CRM_DATA
                </button>
                <button onClick={() => setStaffTab('pst')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${staffTab === 'pst' ? 'bg-blue-900/40 text-blue-400 border border-blue-900' : 'hover:bg-slate-900'}`}>
                   <ShieldCheck size={18} /> PST_PAIRING
                </button>
                <button onClick={() => setStaffTab('services')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${staffTab === 'services' ? 'bg-blue-900/40 text-blue-400 border border-blue-900' : 'hover:bg-slate-900'}`}>
                   <Clock size={18} /> SERVICE_CONFIG
                </button>
                <button onClick={() => setStaffTab('staffs')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${staffTab === 'staffs' ? 'bg-blue-900/40 text-blue-400 border border-blue-900' : 'hover:bg-slate-900'}`}>
                   <User size={18} /> STAFF_ACCESS
                </button>
              </>
            )}
          </nav>
          
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-500 hover:text-red-400 mt-auto px-4 py-3 font-mono text-sm transition-colors">
            <LogOut size={18} /> LOGOUT
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 relative">
           
           {/* Alerts Pop-up */}
           {pendingAlerts.length > 0 && (
              <div className="absolute top-8 right-8 z-50 flex flex-col gap-3 w-80">
                {pendingAlerts.map(alert => (
                   <div key={alert.id} className="bg-blue-900/90 backdrop-blur-md border border-blue-400 p-5 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in slide-in-from-right-8 duration-500">
                     <div className="flex items-center gap-2 mb-3">
                       <Bell size={18} className="text-blue-400 animate-bounce" />
                       <p className="font-bold text-blue-400 font-mono text-sm">INCOMING_BOOKING</p>
                     </div>
                     <p className="text-white font-bold text-lg">{alert.licensePlate}</p>
                     <p className="text-xs text-slate-300 font-mono mb-4">{alert.customerName} • {alert.date} @ {alert.time}</p>
                     <button onClick={() => setPendingAlerts(prev => prev.filter(a => a.id !== alert.id))} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-mono text-xs transition-colors shadow-lg font-bold tracking-widest">
                       ACKNOWLEDGE (รับทราบ)
                     </button>
                   </div>
                ))}
              </div>
           )}

           {staffTab === 'active' && (
              <div className="max-w-6xl mx-auto space-y-6">
                 <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white tracking-wide">SYSTEM DIAGNOSTICS</h1>
                      <p className="text-slate-500 font-mono mt-2">MONITORING {activeJobs.length} ACTIVE PROCESSES</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {activeJobs.map(job => {
                        const customer = customers.find(c => c.id === job.customerId);
                        const step = INITIAL_SERVICE_STEPS.find(s => s.id === job.currentStepId);
                        
                        return (
                          <div key={job.jobId} className="bg-[#050B14] rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                              
                              <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                  <div className="flex gap-2 mb-3">
                                      <span className="bg-blue-900/30 border border-blue-900 text-blue-400 text-[10px] font-bold px-2 py-1 rounded font-mono inline-block">PROCESS: {job.jobId}</span>
                                      {job.reqLounge && <span className="bg-amber-900/30 border border-amber-900 text-amber-400 text-[10px] font-bold px-2 py-1 rounded font-mono flex items-center gap-1" title="ลูกค้าจองพื้นที่ Lounge"><Coffee size={12}/> VIP_LOUNGE</span>}
                                      {job.reqEV && <span className="bg-emerald-900/30 border border-emerald-900 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded font-mono flex items-center gap-1" title="ลูกค้าขอชาร์จ EV"><Zap size={12}/> EV_CHARGE</span>}
                                  </div>
                                  {job.specialStatus && (
                                    <span className="bg-red-900/30 border border-red-900 text-red-400 text-[10px] font-bold px-2 py-1 rounded font-mono mb-3 inline-flex items-center gap-1 animate-pulse">
                                      <AlertCircle size={10}/> ERR: {job.specialStatus.type}
                                    </span>
                                  )}
                                  <h2 className="text-3xl font-bold text-white mb-1 tracking-wider">{job.licensePlate}</h2>
                                  <p className="text-slate-500 font-mono text-xs">{customer?.model} // {customer?.name}</p>
                                </div>
                                <div className="text-right">
                                   <div className="text-2xl font-bold text-blue-500 font-mono">{job.currentStepId}/5</div>
                                   <p className="text-[10px] text-slate-500">STAGE</p>
                                </div>
                              </div>

                              <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 mb-6 relative z-10">
                                <p className="text-xs text-slate-500 mb-3 font-mono">CURRENT_STATUS</p>
                                <div className="flex items-center gap-4 text-white font-bold text-lg mb-6">
                                  <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center border border-blue-500/30">
                                    <step.icon size={20} />
                                  </div>
                                  {step?.title}
                                </div>
                                
                                <div className="flex gap-3">
                                   {job.currentStepId < 5 ? (
                                       <button onClick={() => setActiveJobs(jobs => jobs.map(j => j.jobId === job.jobId ? {...j, currentStepId: j.currentStepId + 1} : j))} 
                                               className="flex-1 bg-blue-600/80 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-colors font-mono text-sm border border-blue-500 flex justify-center items-center gap-2">
                                         ADVANCE_STEP <ArrowRight size={16} />
                                       </button>
                                   ) : (
                                       <button onClick={() => setActiveJobs(jobs => jobs.map(j => j.jobId === job.jobId ? {...j, currentStepId: 1, notes: [], specialStatus: null} : j))} 
                                               className="flex-1 bg-emerald-600/80 hover:bg-emerald-500 text-white py-3 rounded-lg font-bold transition-colors font-mono text-sm border border-emerald-500 flex justify-center items-center gap-2">
                                         HANDOVER_COMPLETE <CheckCircle2 size={16} />
                                       </button>
                                   )}
                                   
                                   {job.specialStatus ? (
                                       <button onClick={() => setActiveJobs(jobs => jobs.map(j => j.jobId === job.jobId ? {...j, specialStatus: null} : j))} 
                                               className="px-4 bg-amber-600/20 hover:bg-amber-500/40 text-amber-500 rounded-lg font-bold transition-colors border border-amber-600/50 flex items-center gap-2 font-mono text-xs">
                                         CLEAR_ERR
                                       </button>
                                   ) : (
                                       <button onClick={() => setActiveJobs(jobs => jobs.map(j => j.jobId === job.jobId ? {...j, specialStatus: {type:'รออะไหล่ / ติดปัญหา', reason:'ช่างกำลังดำเนินการตรวจสอบเพิ่มเติม'}} : j))} 
                                               className="px-4 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg font-bold transition-colors border border-red-900/50 flex items-center gap-2 font-mono text-xs">
                                         FLAG_ISSUE
                                       </button>
                                   )}
                                </div>
                              </div>

                              <div className="mt-auto relative z-10 border-t border-slate-800 pt-5">
                                 {job.notes && job.notes.length > 0 && (
                                    <div className="mb-4 max-h-32 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                      {job.notes.map((note, idx) => (
                                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                                          <p className="text-[10px] font-mono text-blue-500 mb-1">LOGGED_AT: {note.timestamp}</p>
                                          <p className="text-xs text-slate-300">"{note.text}"</p>
                                        </div>
                                      ))}
                                    </div>
                                 )}
                                 
                                 <p className="text-[10px] font-mono text-slate-500 mb-2">QUICK_REPLIES</p>
                                 <div className="flex flex-wrap gap-2 mb-4">
                                     <button type="button" onClick={() => handleAddNote(job.jobId, job.currentStepId, 'ตรวจสอบระบบคอมพิวเตอร์ด้วย VIDA สมบูรณ์ปกติครับ')} className="text-[10px] font-mono bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded border border-slate-700 transition-colors flex items-center gap-1"><Cpu size={12}/> VIDA_SCAN_OK</button>
                                     <button type="button" onClick={() => handleAddNote(job.jobId, job.currentStepId, 'ระบบไฮบริดและแบตเตอรี่อยู่ในสภาพสมบูรณ์')} className="text-[10px] font-mono bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded border border-slate-700 transition-colors flex items-center gap-1"><BatteryCharging size={12}/> BATT_OK</button>
                                 </div>
                                 
                                 <form onSubmit={(e) => { e.preventDefault(); handleAddNote(job.jobId, job.currentStepId, e.target.note.value); e.target.reset(); }} className="flex gap-2">
                                     <input name="note" type="text" placeholder="TRANSMIT_MESSAGE..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-slate-600 focus:border-blue-500 outline-none" />
                                     <button type="submit" className="bg-slate-800 text-slate-300 px-4 rounded-lg font-mono text-xs hover:bg-slate-700 hover:text-white transition-colors border border-slate-700">SEND</button>
                                 </form>
                              </div>
                          </div>
                        );
                    })}
                 </div>
              </div>
           )}

           {staffTab === 'calendar' && (
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 h-full">
                  <div className="flex-1 bg-[#050B14] rounded-2xl p-6 border border-slate-800 shadow-2xl">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white font-mono tracking-wide">BOOKING_SCHEDULE</h2>
                        <div className="flex gap-2 font-mono text-sm">
                           <button onClick={() => setStaffMonthDate(new Date(staffMonthDate.getFullYear(), staffMonthDate.getMonth() - 1, 1))} className="p-2 text-slate-500 hover:text-white"><ChevronLeft size={16}/></button>
                           <span className="py-2 text-blue-400">{staffMonthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}</span>
                           <button onClick={() => setStaffMonthDate(new Date(staffMonthDate.getFullYear(), staffMonthDate.getMonth() + 1, 1))} className="p-2 text-slate-500 hover:text-white"><ChevronRight size={16}/></button>
                        </div>
                     </div>
                     <div className="grid grid-cols-7 gap-2">
                        {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(d => <div key={d} className="text-center text-[10px] font-mono text-slate-600 py-2">{d}</div>)}
                        {generateCalendarDays(staffMonthDate).map((day, idx) => {
                            if (day.empty) return <div key={`e-${idx}`} className="p-2"></div>;
                            const dateStr = day.fullDate.toISOString().split('T')[0];
                            const isSelected = staffSelectedDate === dateStr;
                            const dayBookings = bookings.filter(b => b.date === dateStr);
                            
                            return (
                                <button key={idx} onClick={() => setStaffSelectedDate(dateStr)} className={`aspect-square rounded-xl flex flex-col items-center justify-center relative font-mono transition-colors border ${isSelected ? 'bg-blue-900/30 border-blue-500 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                                    {day.date}
                                    {dayBookings.length > 0 && <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                                </button>
                            );
                        })}
                     </div>
                  </div>

                  <div className="w-full md:w-80 bg-[#050B14] rounded-2xl p-6 border border-slate-800 shadow-2xl flex flex-col h-full overflow-y-auto custom-scrollbar">
                     <h3 className="text-sm font-bold text-slate-400 font-mono mb-4 border-b border-slate-800 pb-2">SELECTED: {staffSelectedDate}</h3>
                     <div className="space-y-4 flex-1">
                         {bookings.filter(b => b.date === staffSelectedDate).length === 0 ? (
                             <p className="text-xs text-slate-600 font-mono text-center py-10">NO_DATA_FOUND</p>
                         ) : (
                             bookings.filter(b => b.date === staffSelectedDate).map(b => (
                                 <div key={b.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col">
                                     <div className="flex justify-between items-center mb-2">
                                         <span className="text-blue-400 font-mono text-sm">{b.time}</span>
                                         <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">{b.licensePlate}</span>
                                     </div>
                                     <p className="font-bold text-white text-sm mb-1">{b.customerName}</p>
                                     <p className="text-[10px] text-slate-500 font-mono mb-2">{b.phone}</p>
                                     <p className="text-xs text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded inline-block w-fit mb-3">{b.service}</p>
                                     
                                     {/* แสดงความต้องการพิเศษ */}
                                     {(b.reqLounge || b.reqEV) && (
                                        <div className="flex gap-2 mb-3">
                                          {b.reqLounge && <span className="text-[10px] bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-900/50"><Coffee size={10}/> LOUNGE</span>}
                                          {b.reqEV && <span className="text-[10px] bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-900/50"><Zap size={10}/> EV</span>}
                                        </div>
                                     )}
                                     
                                     <button onClick={() => handleStartBooking(b.id)} className="mt-auto w-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-800 hover:border-blue-500 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-2">
                                         <Car size={14} /> รับรถเข้าศูนย์ (DROP-OFF)
                                     </button>
                                 </div>
                             ))
                         )}
                     </div>
                  </div>
              </div>
           )}

           {staffTab === 'services' && (
              <div className="max-w-4xl mx-auto space-y-6">
                 <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white tracking-wide">SERVICE CONFIGURATION</h1>
                      <p className="text-slate-500 font-mono mt-2">กำหนดระยะเวลาประเมินมาตรฐานสำหรับโปรแกรมซ่อมบำรุงแต่ละประเภท</p>
                    </div>
                 </div>

                 <div className="bg-[#050B14] rounded-2xl p-6 border border-blue-900/50 shadow-2xl mb-8 border-dashed">
                    <h3 className="text-blue-400 font-mono text-sm mb-4">ADD_NEW_PROGRAM</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                       <input 
                         type="text" 
                         placeholder="ระบุชื่อโปรแกรมซ่อม/บริการใหม่..." 
                         value={newServiceName}
                         onChange={e => setNewServiceName(e.target.value)}
                         className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                       />
                       <div className="flex gap-4">
                          <div className="flex items-center gap-3 bg-slate-900 px-4 rounded-lg border border-slate-700">
                             <label className="text-xs text-slate-400 font-mono">EST_MINS:</label>
                             <input 
                               type="number" 
                               value={newServiceTime}
                               onChange={e => setNewServiceTime(parseInt(e.target.value)||0)}
                               className="w-16 bg-transparent text-white font-bold font-mono text-center outline-none"
                             />
                          </div>
                          <button 
                            onClick={() => {
                               if(newServiceName.trim()) {
                                  setServices(prev => [{id: `s${Date.now()}`, name: newServiceName, estimatedMinutes: newServiceTime}, ...prev]);
                                  setNewServiceName('');
                                  setNewServiceTime(60);
                               }
                            }}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 font-mono text-sm"
                          >
                             <Plus size={16} /> ADD
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="bg-[#050B14] rounded-2xl p-6 border border-slate-800 shadow-2xl">
                    <div className="space-y-4">
                       {services.map(service => (
                          <div key={service.id} className="flex justify-between items-center bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-blue-900 transition-colors">
                             <div>
                                <p className="font-bold text-white text-lg">{service.name}</p>
                                <p className="text-xs text-slate-500 font-mono mt-1">PROGRAM_ID: {service.id}</p>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-black/40 p-2 rounded-lg border border-slate-800">
                                   <label className="text-xs text-slate-400 font-mono pl-2">EST_MINUTES:</label>
                                   <input 
                                     type="number" 
                                     value={service.estimatedMinutes}
                                     onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        setServices(prev => prev.map(s => s.id === service.id ? {...s, estimatedMinutes: val} : s));
                                     }}
                                     className="w-20 bg-slate-950 border border-blue-900/50 text-blue-400 font-bold font-mono p-2 rounded-md text-center focus:border-blue-500 outline-none"
                                   />
                                   <span className="text-slate-500 font-mono text-xs pr-2">MINS</span>
                                </div>
                                <button 
                                   onClick={() => setServices(prev => prev.filter(s => s.id !== service.id))}
                                   className="p-3 text-slate-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                   title="Delete Program"
                                >
                                   <Trash2 size={18} />
                                </button>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}

           {staffTab === 'crm' && (
              <div className="max-w-6xl mx-auto space-y-6">
                 <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white tracking-wide">CUSTOMER_DATABASE</h1>
                      <p className="text-slate-500 font-mono mt-2">TOTAL RECORDS: {customers.length}</p>
                    </div>
                 </div>
                 <div className="bg-[#050B14] rounded-2xl border border-slate-800 shadow-2xl overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400 whitespace-nowrap">
                       <thead className="bg-slate-900 text-xs uppercase font-mono text-slate-500">
                          <tr>
                             <th className="px-6 py-5">ลูกค้า / รถยนต์</th>
                             <th className="px-6 py-5">ข้อมูลติดต่อ</th>
                             <th className="px-6 py-5">เลขตัวถัง (VIN)</th>
                             <th className="px-6 py-5 text-right">เช็คระยะถัดไป</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-800">
                          {customers.map(c => (
                             <tr key={c.id} className="hover:bg-slate-900/50 transition-colors">
                                <td className="px-6 py-4">
                                   <p className="text-white font-bold">{c.name}</p>
                                   <p className="text-blue-400 font-mono mt-1">{c.licensePlate} <span className="text-slate-500 ml-1">({c.model})</span></p>
                                </td>
                                <td className="px-6 py-4 font-mono">
                                   <p className="text-slate-300 flex items-center gap-2"><Phone size={12}/> {c.phone}</p>
                                   <p className="text-emerald-400 mt-1 flex items-center gap-2"><MessageCircle size={12}/> {c.lineId}</p>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-500 uppercase">{c.vin}</td>
                                <td className="px-6 py-4 text-right font-mono">
                                   <p className="text-white font-bold">{c.nextServiceKm.toLocaleString()} KM</p>
                                   <p className="text-slate-500 text-xs mt-1">in {c.nextServiceDays} Days</p>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {staffTab === 'pst' && (() => {
              const currentPstMonthKey = getMonthKey(pstMonthDate);
              const currentMonthTeams = monthlyTeams[currentPstMonthKey] || [];
              
              return (
              <div className="max-w-6xl mx-auto space-y-6">
                 <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white tracking-wide">PST_PAIRING (TEAM ASSIGNMENT)</h1>
                      <p className="text-slate-500 font-mono mt-2">MONTHLY TEAM CONFIGURATION & ACTIVE PROCESSES</p>
                    </div>
                 </div>
                 
                 <div className="mb-10">
                    <div className="flex justify-between items-center mb-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                       <div className="flex gap-2 font-mono text-sm items-center">
                           <button onClick={() => setPstMonthDate(new Date(pstMonthDate.getFullYear(), pstMonthDate.getMonth() - 1, 1))} className="p-2 text-slate-500 hover:text-white"><ChevronLeft size={16}/></button>
                           <span className="py-2 text-blue-400 font-bold text-lg">{pstMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()} TEAMS</span>
                           <button onClick={() => setPstMonthDate(new Date(pstMonthDate.getFullYear(), pstMonthDate.getMonth() + 1, 1))} className="p-2 text-slate-500 hover:text-white"><ChevronRight size={16}/></button>
                       </div>
                       <button onClick={() => {
                           setMonthlyTeams(prev => {
                               const key = getMonthKey(pstMonthDate);
                               const existing = prev[key] || [];
                               return { ...prev, [key]: [...existing, { id: `t${Date.now()}`, name: `PST Team ${String.fromCharCode(65 + existing.length)}`, techs: [] }] };
                           });
                       }} className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-900 hover:border-blue-500 px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-colors"><Plus size={14}/> ADD_TEAM</button>
                    </div>
                    
                    {currentMonthTeams.length === 0 ? (
                        <div className="text-center py-10 border border-dashed border-slate-700 rounded-xl bg-slate-900/30">
                           <p className="text-slate-500 font-mono text-sm">NO_TEAMS_CONFIGURED_FOR_THIS_MONTH</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                           {currentMonthTeams.map(team => (
                               <div key={team.id} className="bg-slate-900/50 p-5 rounded-xl border border-blue-900/30">
                                  <div className="flex justify-between items-center mb-4">
                                     <input type="text" value={team.name} onChange={(e) => {
                                         setMonthlyTeams(prev => {
                                             const key = getMonthKey(pstMonthDate);
                                             return { ...prev, [key]: prev[key].map(t => t.id === team.id ? {...t, name: e.target.value} : t) };
                                         });
                                     }} className="bg-transparent text-blue-400 font-bold font-mono text-lg outline-none border-b border-dashed border-blue-900/50 focus:border-blue-400 w-full mr-4" />
                                     <button onClick={() => {
                                         setMonthlyTeams(prev => {
                                             const key = getMonthKey(pstMonthDate);
                                             return { ...prev, [key]: prev[key].filter(t => t.id !== team.id) };
                                         });
                                     }} className="text-slate-600 hover:text-red-400"><Trash2 size={16}/></button>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                     {technicians.map(tech => {
                                         const isAssigned = team.techs.includes(tech.id);
                                         return (
                                             <button key={tech.id} onClick={() => {
                                                 setMonthlyTeams(prev => {
                                                     const key = getMonthKey(pstMonthDate);
                                                     return { ...prev, [key]: prev[key].map(t => {
                                                         if(t.id === team.id) {
                                                             const newTechs = isAssigned ? t.techs.filter(id => id !== tech.id) : [...t.techs, tech.id];
                                                             return {...t, techs: newTechs};
                                                         }
                                                         return t;
                                                     })};
                                                 });
                                             }} className={`flex items-center gap-2 p-1.5 pr-3 rounded-lg border text-xs transition-colors ${isAssigned ? 'bg-blue-900/40 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                                                 <img src={tech.img} className={`w-6 h-6 rounded-full object-cover ${!isAssigned && 'grayscale opacity-50'}`} />
                                                 {tech.name}
                                             </button>
                                         )
                                     })}
                                  </div>
                               </div>
                           ))}
                        </div>
                    )}
                 </div>

                 <div className="border-t border-slate-800 pt-8">
                     <h2 className="text-xl font-bold text-white mb-4 tracking-wide">ACTIVE_PROCESS_ASSIGNMENT</h2>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {activeJobs.map(job => (
                           <div key={job.jobId} className="bg-[#050B14] rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full"></div>
                              <div className="flex justify-between items-start mb-6 relative z-10">
                                 <div>
                                    <span className="text-blue-400 text-xs font-bold font-mono inline-block mb-1 border border-blue-900/50 bg-blue-900/20 px-2 py-0.5 rounded">PROCESS: {job.jobId}</span>
                                    <h3 className="text-2xl font-bold text-white">{job.licensePlate}</h3>
                                 </div>
                              </div>
                              <div className="space-y-3 relative z-10">
                                 <div className="flex justify-between items-end mb-2">
                                     <p className="text-xs text-slate-500 font-mono">ASSIGNED_TECHNICIANS:</p>
                                     {currentMonthTeams.length > 0 && (
                                        <div className="flex gap-1 flex-wrap justify-end">
                                           {currentMonthTeams.map(team => (
                                               <button key={team.id} onClick={() => {
                                                   setActiveJobs(jobs => jobs.map(j => j.jobId === job.jobId ? {...j, team: team.techs} : j));
                                               }} className="text-[10px] font-mono bg-blue-900/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-900/50 px-2 py-1 rounded transition-colors">
                                                   ASSIGN {team.name}
                                               </button>
                                           ))}
                                        </div>
                                     )}
                                 </div>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {technicians.map(tech => {
                                       const isAssigned = job.team.includes(tech.id);
                                       return (
                                          <button 
                                             key={tech.id} 
                                             onClick={() => {
                                                setActiveJobs(jobs => jobs.map(j => {
                                                   if (j.jobId === job.jobId) {
                                                      if (isAssigned && j.team.length === 1) return j; 
                                                      const newTeam = isAssigned ? j.team.filter(id => id !== tech.id) : [...j.team, tech.id];
                                                      return {...j, team: newTeam};
                                                   }
                                                   return j;
                                                }));
                                             }}
                                             className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left ${isAssigned ? 'bg-blue-900/30 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
                                          >
                                             <div className="relative shrink-0">
                                                <img src={tech.img} className={`w-10 h-10 rounded-full object-cover transition-all ${isAssigned ? 'ring-2 ring-blue-500' : 'grayscale opacity-40'}`} />
                                                {isAssigned && <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-[#050B14] rounded-full"></span>}
                                             </div>
                                             <div className="min-w-0">
                                                <p className={`text-sm font-bold truncate ${isAssigned ? 'text-white' : 'text-slate-400'}`}>{tech.name}</p>
                                                <p className="text-[10px] text-slate-500 font-mono truncate">{tech.role}</p>
                                             </div>
                                          </button>
                                       )
                                    })}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                 </div>
              </div>
              );
           })()}

           {/* ฟีเจอร์ใหม่: STAFF ACCESS CONTROL (เฉพาะแอดมิน) */}
           {staffTab === 'staffs' && (
              <div className="max-w-4xl mx-auto space-y-6">
                 <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white tracking-wide">STAFF ACCESS CONTROL</h1>
                      <p className="text-slate-500 font-mono mt-2">จัดการรหัสเข้าใช้งานของทีมช่าง (เฉพาะ Service Manager)</p>
                    </div>
                 </div>
                 <div className="bg-[#050B14] rounded-2xl p-6 border border-slate-800 shadow-2xl">
                    <div className="space-y-4">
                       {technicians.map(tech => (
                          <div key={tech.id} className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-blue-900 transition-colors">
                             <div className="flex items-center gap-4">
                                <img src={tech.img} className="w-12 h-12 rounded-full object-cover grayscale opacity-80" />
                                <div>
                                   <p className="font-bold text-white text-lg">{tech.name}</p>
                                   <p className="text-xs text-slate-500 font-mono mt-1">ROLE: {tech.role}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="flex flex-col gap-1">
                                   <label className="text-[10px] text-slate-500 font-mono">USERNAME</label>
                                   <input 
                                     type="text" 
                                     value={tech.username}
                                     onChange={(e) => setTechnicians(prev => prev.map(t => t.id === tech.id ? {...t, username: e.target.value} : t))}
                                     className="w-32 bg-slate-950 border border-blue-900/50 text-blue-400 font-bold font-mono p-2 rounded-md focus:border-blue-500 outline-none"
                                   />
                                </div>
                                <div className="flex flex-col gap-1">
                                   <label className="text-[10px] text-slate-500 font-mono">PASSWORD</label>
                                   <input 
                                     type="text" 
                                     value={tech.password}
                                     onChange={(e) => setTechnicians(prev => prev.map(t => t.id === tech.id ? {...t, password: e.target.value} : t))}
                                     className="w-32 bg-slate-950 border border-amber-900/50 text-amber-400 font-bold font-mono p-2 rounded-md focus:border-amber-500 outline-none"
                                   />
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}

        </div>
      </div>
    );
  };
  
  const terminalStyles = `
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
  `;

  if (authMode === 'staffDashboard' && currentStaff) return <><style>{terminalStyles}</style>{renderStaffDashboard()}</>;
  if (authMode !== 'app') return renderAuthScreens();

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden w-full">
      {renderCustomerSidebar()}
      <main className="flex-1 flex flex-col h-screen relative w-full overflow-hidden">
        <header className="md:hidden bg-[#050B14] text-white p-4 flex justify-between items-center z-20 shadow-lg">
           <div>
             <h1 className="text-xl font-bold tracking-widest">VOLVO</h1>
             <p className="text-[10px] text-blue-400">Personal Service Hub</p>
           </div>
           <button onClick={handleLogout} className="text-slate-400"><LogOut size={20}/></button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth pb-24 md:pb-8">
          {activeTab === 'tracking' && renderTracking()}
          {activeTab === 'booking' && renderBooking()}
        </div>

        <nav className="md:hidden absolute bottom-0 w-full bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-40 pb-safe">
          <button onClick={() => setActiveTab('tracking')} className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'tracking' ? 'text-blue-600' : 'text-slate-400'}`}>
            <Car size={24} className={activeTab === 'tracking' ? 'animate-[pulse_2s_infinite]' : ''} />
            <span className="text-[10px] font-bold mt-1">สถานะ</span>
          </button>
          <div className="relative -top-6">
            <button onClick={() => { setActiveTab('booking'); setBookingStep(1); }} className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-105 active:scale-95 border-4 border-slate-50 ${activeTab === 'booking' ? 'bg-[#050B14]' : 'bg-blue-600'}`}>
              <CalendarIcon size={24} />
            </button>
          </div>
          <button className="flex flex-col items-center p-2 transition-colors text-slate-400 opacity-50 cursor-not-allowed">
            <Bell size={24} />
            <span className="text-[10px] font-bold mt-1">แจ้งเตือน</span>
          </button>
        </nav>
      </main>
      <style dangerouslySetInnerHTML={{__html: `.pb-safe { padding-bottom: env(safe-area-inset-bottom, 1rem); }`}} />
    </div>
  );
}