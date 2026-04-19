# Mixon Case — AI Destekli Hasar Orkestrasyonu

Bu proje, sigorta hasar süreçlerini daha anlaşılır, takip edilebilir ve aksiyon alınabilir hale getirmek amacıyla hazırlanmış bir **AI-Powered Claim Orchestrator Dashboard** case çalışmasıdır.

Temel amaç, kullanıcıya bir hasar dosyasının:

- mevcut durumunu,
- tahmini kalan süresini,
- gerekli kullanıcı aksiyonlarını,
- süreç adımlarının detaylarını

tek bir ekranda, hızlı ve anlaşılır şekilde göstermektir.

Case içinde dikkat çeken önemli noktalardan biri de, kullanıcıların süreç adımları arasına dinamik olarak yeni bilgi notları veya ek dosyalar ekleyebilmesi beklentisiydi. Bu yüzden sadece mevcut veriyi göstermek değil, sürecin ileride daha etkileşimli ve genişleyebilir hale gelebileceği bir yapıyı da düşünerek ilerlemeye çalıştım.

Bu çalışma kapsamında özellikle şu problemlere odaklanıldı:

- farklı veri şekillerine sahip süreç adımlarını tek bir akış içinde gösterebilmek,
- heterojen JSON yapısını ölçeklenebilir bir UI yaklaşımıyla işlemek,
- süreç adımları arasına sonradan eklenecek not / ek dosya gibi alanları destekleyebilecek bir yapı düşünmek,
- modern ve responsive bir dashboard deneyimi sunmak,
- AI destekli açıklama deneyimini simüle etmek.

## Proje Bağımlılıkları

- `next`
- `react`
- `react-dom`
- `typescript`
- `@tanstack/react-query`
- `zod`
- `zustand`
- `tailwindcss`
- `shadcn/ui`
- `lucide-react`
- `clsx`
- `class-variance-authority`
- `tailwind-merge`

## Kurulum ve Çalıştırma

> npm install

> npm run dev

## Tasarım Kararları

Bu case’i geliştirirken önceliğim, verilen süre içinde hem hızlı ilerleyebileceğim hem de teknik olarak temiz bir temel kurabileceğim bir yapı oluşturmaktı. Case beklentileri; responsive bir dashboard, heterojen `processDetails` verisini yönetebilen bir yapı, AI destekli açıklama alanları ve geliştirilebilir bir component mimarisi kurulmasını istiyordu.

UI tarafında hız kazanmak ve tutarlı bir görünüm elde etmek için **shadcn/ui** bileşenlerini ve dashboard yaklaşımını örnek aldım. Bunun sebebi, sıfırdan her bileşeni tasarlamak ve oluşturmak zaman alacaktı. Özellikle kart yapıları, accordion düzeni, badge alanları ve genel layout yapısında bu sistem işimi hızlandırdı.

“Önce en kritik bilgi, sonra detay” mantığı genel ilerleyiş mantığım oldu. Kullanıcının ilk bakışta dosya numarasını, mevcut durumu, tahmini kalan süreyi ve aksiyon gerekip gerekmediğini görebilmesini hedefledim. Daha detaylı süreç bilgilerini ise accordion yapısı altında kademeli olarak gösterdim. Böylece ekran hem daha okunabilir kaldı hem de mobil tarafta bilgi yoğunluğu daha kontrollü oldu.

## Süre Notu

Case içinde süre sınırı 2 saat olarak belirtilmişti. Ben bu detayı, projeye başlayıp ana sayfa yapısını ve genel detail ekran yerleşimini büyük ölçüde kurduktan sonra fark ettim.

Bu yüzden çalışmayı tam olarak 2 saatte değil, yaklaşık **3.5 - 4 saat** içinde tamamladım. O noktaya kadar yaptığım geliştirmeleri geri almak ya da silmek istemediğim için projeyi mevcut haliyle paylaşmayı tercih ettim.

Yani teslim edilen çalışma, 2 saatlik sınır birebir korunarak çıkarılmış bir sonuç değil; ancak case’in istediği yapıyı daha net gösterebilmek için devam edilerek toparlanmış bir versiyon. Buna rağmen yaklaşım olarak yine hızlı karar alma, çalışan bir akış kurma ve doğru teknik yönü gösterme odağında ilerledim.

## Daha Fazla Zaman Olsaydı Neleri İyileştirirdim?

Daha fazla zamanım olsaydı ilk geliştireceğim alanlardan biri AI Doc Analyzer tarafı olurdu. Case içinde AI Document Analyzer beklentisi vardı ama ben bu kısmı tamamlayamadım. Şu an projede gerçek bir dosya yükleme ve buna bağlı çalışan bir analiz akışı yok. Bu yüzden ek sürede önce upload akışını düzgün kurup, sonrasında bunun üstüne daha anlamlı bir AI kontrol yapısı eklemek isterdim. Bu alanı da AI Explanation kısmında yaptığım gibi gerçek bir AI simülasyonu gibi UI ile sunarak tam bir deneyim kurgulamak isterdim.

UI tarafında da ek geliştirme yapardım. Hem mobil hem web görünümünde bazı küçük yerleşim ve kullanım problemlerini tekrar gözden geçirip düzeltmek isterdim. Özellikle responsive davranış, spacing dengesi, bilgi yoğunluğu ve bazı ekran geçişleri biraz daha geliştirilebilirdi. Bunun yanında genel UI için daha fazla test yapıp sorunlu alanları toparlamak isterdim.

Ana sayfa tarafında da filtreleme ve sıralama alanlarını genişletirdim. Şu an temel listeleme ve arama akışı var ama ek sürede kullanıcıya daha fazla kontrol verecek filter ve sort yapıları eklemek isterdim. Bu, özellikle claim listesi büyüdüğünde ekranın kullanımını daha güçlü hale getirirdi.

Component tarafında da bazı ortak yapıları daha temiz hale getirmek isterdim. Özellikle badge ve ikon kullanımlarında daha ortak, tekrar kullanılabilir ve tek yerden yönetilebilen bir sistem kurmak iyi olurdu. Böylece hem görsel tutarlılık artar hem de yeni ekran veya durumlar eklendiğinde bakım daha kolay hale gelirdi.

Ayrıca, case içinde özellikle beklenen polymorphic yapı tarafını da daha detaylı kontrol edip güçlendirmek için yapabileceğim bir şeyler var mı diye kontrol etmek isterdim. Ek sürede, componentlerin bu mimariye ne kadar uyduğunu daha net kontrol edip gerekirse yapıyı biraz daha sıkı hale getirmek isterdim. Özellikle yeni bir process step eklendiğinde mevcut kodu ne kadar az değiştirerek geliştirme yapabileceğimi test etmek isterdim.

Kısacası, ek süre olsaydı en çok şu alanlara odaklanırdım:

- AI Document Analyzer akışını tamalamak
- mobil ve web tarafındaki UI hatalarını toparlamak ve farklı bir tasarım design oluşturmak
- ana sayfaya filter ve sort alanları eklemek
- badge ve ikon yapısını daha ortak ve ölçeklenebilir hale getirmek
- genel component yapısını biraz daha temizlemek

## Kullandığım Yapay Zekâ Araçları

Bu çalışmada ChatGPT ve GitHub Copilot kullandım.

ChatGPT’yi daha çok mimariyi nasıl kurayım, componentleri nasıl böleyim, bazı yerleri daha temiz nasıl toparlayayım gibi konularda yardımcı oldu. README gibi açıklama taraflarında da destek aldım. Özellikle farklı veri yapılarıyla gelen step’leri daha düzenli nasıl yönetebilirim ve case beklentisine daha uygun nasıl bir yapı çıkarabilirim tarafında faydalı oldu.

GitHub Copilot’u ise daha çok kod yazarken kullandım. Tekrarlayan component iskeletlerinde, küçük helper fonksiyonlarda, type tanımlarında ve bazı ufak kod parçalarında hız kazandırdı. Yani Copilot daha çok yazım hızını artırdı, ChatGPT ise düşünme ve toparlama tarafında yardımcı oldu.

Ama iki aracı da direkt hazır iş üretsin diye kullanmadım. Daha çok hız kazanmak, alternatif görmek ve bazı yerlerde düşünceyi netleştirmek için kullandım. Son kararları, ekran yapısını ve kod organizasyonunu yine ben belirledim.
