<template>
  <div class="mt-4">
    <div class="footer__mail d-flex">
      <div class="d-flex flex-column">
        <div class="font-weight-bold txt-blue mr-5 font-24px">ĐĂNG KÝ NHẬN EMAIL</div>
        <p>Đăng ký nhận thông tin sách mới, sách bán</p>
      </div>
      <div class="footer__mail-input d-flex mr-3">
        <input type="text" class="form-control mr-1" placeholder="Tên của bạn">
        <input type="text" class="form-control mr-1" placeholder="Nhập địa chỉ email của bạn ...">
        <select class="custom-select" id="inputGroupSelect01">
          <option selected>Thể loại yêu thích</option>
          <option value="1">Tất cả</option>
          <option value="2">Sách ngoại ngữ</option>
          <option value="3">Sách ngoại văn</option>
          <option value="4">Sách kinh tế</option>
        </select>
      </div>
      <div>
        <button class="btn btn-info">Đăng ký ngay</button>
      </div>
    </div>

    <div class="footer">
      <div class="footer__main d-flex">
        <div class="footer__main-left mr-4">
          <div class="d-flex">
            <div class="mr-3">
              <h3 class="font-weight-bold mb-4">VỀ CÔNG TY</h3>
              <p v-for="(info, index) in listInfoFooter[0]" :key="index">
                {{ info }}
              </p>
            </div>
            <div class="mr-3">
              <h3 class="font-weight-bold mb-4">TRỢ GIÚP / DỊCH VỤ</h3>
              <p v-for="(info, index) in listInfoFooter[1]" :key="index">
                {{ info }}
              </p>
            </div>
            <div class="mr-3">
              <h3 class="font-weight-bold mb-4">TIN TỨC SÁCH</h3>
              <p v-for="(info, index) in listInfoFooter[2]" :key="index">
                {{ info }}
              </p>
            </div>
            <div>
              <h3 class="font-weight-bold mb-4">TÀI KHOẢN CỦA TÔI</h3>
              <p v-for="(info, index) in listInfoFooter[3]" :key="index">
                {{ info }}
              </p>
            </div>
          </div>
        </div>

        <div class="footer__main-right d-flex">
          <div class="mx-3">
            <h3 class="font-weight-bold mb-4">CHẤP NHẬN THANH TOÁN</h3>
            <div class="mb-2">
              <img src="~/assets/images/visa6.jpg" width="70" height="45" class="mr-1" loading="lazy">
              <img src="~/assets/images/visa2.png" width="70" height="45" class="mr-1" loading="lazy">
              <img src="~/assets/images/visa3.png" width="70" height="45" class="mr-1" loading="lazy">
            </div>
            <div>
              <img src="~/assets/images/visa1.png" width="70" height="45" class="mr-1" loading="lazy">
              <img src="~/assets/images/visa4.jpg" width="70" height="45" class="mr-1" loading="lazy">
              <img src="~/assets/images/visa5.jpg" width="70" height="45" class="mr-1" loading="lazy">
            </div>
          </div>
          <div>
            <h3 class="font-weight-bold mb-4">TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI</h3>
            <div class="d-flex flex-column ml-4">
              <img src="~/assets/images/appstore.png" width="180" height="45" class="mb-2">
              <img src="~/assets/images/icon-googleplay.png" width="180" height="45">
            </div>
          </div>
        </div>
      </div>
      <div class="footer__bottom d-flex container">
        <img src="~/assets/images/bo_cong_thuong.png" width="240" height="90">
        <div>
          <h3 class="font-weight-bold mb-2">CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ MÊ KÔNG COM</h3>
          <p>Địa chỉ: 52/2 Thoại Ngọc Hầu, Phường Hòa Thạnh, Quận Tân Phú, Hồ Chí Minh</p>
          <p>MST: 0303615027 do Sở Kế Hoạch Và Đầu Tư Tp.HCM cấp ngày 10/03/2011</p>
          <p>Tel: 028.73008182 - Fax: 028.39733234 - Email: hotro@vinabook.com</p>
        </div>
        <div>
          <h3 class="font-weight-bold mb-2">WEBSITE CÙNG HỆ THỐNG</h3>
          <img src="~/assets/images/NhaSachTienPhong.png" width="187" height="66">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listInfoFooter: [
        ['Giới thiệu công ty', 'Tuyển dụng', 'Góc báo chí', 'Chương trình đại lý', 'Chính sách bảo mật', 'Ứng dụng đọc ebook'],
        ['Quyết định sử dụng', 'Hướng dẫn mua hàng', 'Phương thức thanh toán', 'Phương thức vận chuyển', 'Các câu hỏi thường gặp', 'Bọc sách bằng bìa plastic'],
        ['Tin tức', 'Chân dung', 'Điểm sách', 'Báo lỗi bảo mật', 'Gửi yêu cầu hỗ trợ'],
        ['Đăng nhập', 'Tạo tài khoản mới', 'Chi tiết tài khoản', 'Lịch sử mua hàng']
      ]
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/style/layouts/footer';
</style>
