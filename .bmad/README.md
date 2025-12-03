# BMAD Workflows - Hướng dẫn sử dụng

## Cấu hình đã được khởi tạo

Cấu trúc BMAD workflows đã được thiết lập trong dự án của bạn.

## Cấu trúc thư mục

```
.bmad/
├── cis/
│   ├── config.yaml          # File cấu hình chính
│   └── output/              # Thư mục chứa kết quả workflows
└── README.md                # File này
```

## Workflows có sẵn

Bạn có thể sử dụng các workflows sau bằng cách tham chiếu chúng trong Cursor:

1. **Design Thinking** - `@bmad/cis/workflows/design-thinking`
   - Quy trình thiết kế lấy người dùng làm trung tâm
   - Các giai đoạn: Empathize, Define, Ideate, Prototype, Test

2. **Problem Solving** - `@bmad/cis/workflows/problem-solving`
   - Giải quyết vấn đề có hệ thống
   - Phân tích nguyên nhân gốc rễ, tạo giải pháp sáng tạo

3. **Innovation Strategy** - `@bmad/cis/workflows/innovation-strategy`
   - Chiến lược đổi mới và phát triển

4. **Storytelling** - `@bmad/cis/workflows/storytelling`
   - Kể chuyện và trình bày

## Cách sử dụng

1. Trong Cursor, tham chiếu workflow bạn muốn sử dụng:
   ```
   @bmad/cis/workflows/design-thinking
   ```

2. Hoặc sử dụng các agents chuyên biệt:
   - `@bmad/cis/agents/design-thinking-coach`
   - `@bmad/cis/agents/creative-problem-solver`
   - `@bmad/cis/agents/storyteller`

## Tùy chỉnh cấu hình

Chỉnh sửa file `.bmad/cis/config.yaml` để thay đổi:
- Tên người dùng
- Ngôn ngữ giao tiếp
- Thư mục output
- Các cài đặt khác

## Kết quả

Tất cả kết quả từ workflows sẽ được lưu trong thư mục `.bmad/cis/output/`

