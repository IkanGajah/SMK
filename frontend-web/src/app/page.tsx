export default async function Home() {
  // 1. Mengambil data dari server Java (Backend)
  // cache: 'no-store' artinya kita selalu minta data terbaru, ga pakai data sisaan
  const res = await fetch('http://localhost:8080/api/kamar', { cache: 'no-store' });
  const daftarKamar = await res.json();

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Katalog Kos PPLBO</h1>
      
      {/* Tempat untuk menaruh kartu-kartu kos (Grid system) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 2. Mengubah data JSON menjadi tampilan kartu (Mapping) */}
        {daftarKamar.map((kamar: any) => (
          <div key={kamar.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{kamar.nama_kos}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${kamar.status === 'Tersedia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {kamar.status}
              </span>
            </div>
            
            <div className="text-gray-600 mb-2">
              <span className="font-medium">Tipe:</span> {kamar.tipe}
            </div>
            
            <div className="text-2xl font-bold text-blue-600 mt-4">
              Rp {kamar.harga.toLocaleString('id-ID')} <span className="text-sm text-gray-500 font-normal">/ bulan</span>
            </div>
            
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
              Lihat Detail
            </button>
          </div>
        ))}

      </div>
    </main>
  );
}