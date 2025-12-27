// Cơ sở dữ liệu sản phẩm

export const adidasProducts = [
  {
    id: 'adidas-1',
    name: 'Adidas Ultraboost 20',
    price: 2500000,
    priceFormatted: '2.500.000₫',
    category: 'Adidas',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9rh8WThnPS_Z0WZHNhmR1lko5Hbxu-fYUuNtQ2DOV59a6Y845FSoHqCzUCZMF92jmJZOZPvzrFPZFgnvFSWb1JCwtu44StMODJw-aLd8HmyhWxwzaXs1gz424dVRDn6FclPgPuw&usqp=CAc',
    description: 'Giày chạy bộ cao cấp với công nghệ Boost',
    inStock: true,
    featured: true
  },
  {
    id: 'adidas-2',
    name: 'Adidas NMD R1',
    price: 3100000,
    priceFormatted: '3.100.000₫',
    category: 'Adidas',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQaB57nSb8-5wtGDYBhkd4hiF3qG9bhO6PPYGEpLWRXAFN_gh_H4sxREW-uLU8aO2vqoe5uz2GDJQeLMDI8yPI7lR9C3aGDnmHq6sclnBo9kzogJkR-yQ8wLg&usqp=CAc',
    description: 'Thiết kế đường phố hiện đại',
    inStock: true,
    featured: false
  },
  {
    id: 'adidas-3',
    name: 'Adidas Superstar',
    price: 2200000,
    priceFormatted: '2.200.000₫',
    category: 'Adidas',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRLkvLR-1Ca0ihDBFSXTOgyKIq10qRNrvW4X_vq5WYPvc7-9XQ7gwlG1d2vAnOk0mdn7tsh9nbMRfQelzmtP4lIbCU1EtCtREaWi48Km6cGLm_qvelzHHD99Q&usqp=CAc',
    description: 'Biểu tượng thời trang kinh điển',
    inStock: true,
    featured: true
  },
  {
    id: 'adidas-4',
    name: 'Adidas Stan Smith',
    price: 2400000,
    priceFormatted: '2.400.000₫',
    category: 'Adidas',
    image: 'data:image/jpeg;base64,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',
    description: 'Giày tennis cổ điển',
    inStock: true,
    featured: true
  },
  {
    id: 'adidas-5',
    name: 'Adidas Gazelle',
    price: 2300000,
    priceFormatted: '2.300.000₫',
    category: 'Adidas',
    image: 'data:image/webp;base64,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',
    description: 'Phong cách retro năng động',
    inStock: true,
    featured: false
  },
  {
    id: 'adidas-6',
    name: 'Adidas Samba',
    price: 2600000,
    priceFormatted: '2.600.000₫',
    category: 'Adidas',
    image: 'https://cdn.vortexs.io/api/images/4ca4e000-24ef-41a1-966e-49f132a106ad/1920/w/giay-adidas-samba-og-white-royal-blue-night-indigo-jh5632.jpeg',
    description: 'Giày bóng đá trong nhà huyền thoại',
    inStock: true,
    featured: false
  },
  {
    id: 'adidas-7',
    name: 'Adidas Forum Low',
    price: 2800000,
    priceFormatted: '2.800.000₫',
    category: 'Adidas',
    image: 'data:image/jpeg;base64,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',
    description: 'Phong cách bóng rổ cổ điển',
    inStock: true,
    featured: false
  },
  {
    id: 'adidas-8',
    name: 'Adidas ZX 2K Boost',
    price: 2900000,
    priceFormatted: '2.900.000₫',
    category: 'Adidas',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHEBUREhEWEhUVGBgWGBcYGBYWFRgTFRYWGBUXGBcYHSggGBslGxYXITEhJSs3Li4wFyEzODMsQygvLisBCgoKDg0OGhAQGislHyU3Ky0rLy0tLS4tLS0rLTctLSsrLS0tKy0tLS0tLS0tKy0tLSstKy0uLTgzLTgrLSsrLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQECAwj/xABLEAACAQIDBAcDBgkICwAAAAAAAQIDEQQFIQYSMUEHEyJRYXGRMoGhFEJyscHRIzNSVIKSsuHwFhckQ0RiovEVJTRTc3SDs8LD0v/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACERAQACAQMFAQEAAAAAAAAAAAABAhEDBDETITJBURJx/9oADAMBAAIRAxEAPwC4QAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACI4HEyzrNMbhqzfVUKdGNOmm4p9Zd1KjtxldJJ8k/EsRkS4Gq2fxir4aEpVFPWcVNtduMKkoRlfndRWptRMYAAEEb2s2yobLTowrU6k+uU2nBRe6qbgndSkr+2uBtsmzehndJVqE1OD07mmuKknqmRHpjyxYvAxrpdrD1Iy/QqtU5ry7UX+gVnsttRiNmZSlR3WppKUJpuLs9H2WmmtdfEK+iARnY7bGjtLHdt1VeKvKk3e6/Kg/nR+K5kmCAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6QZvLKsK9CahXrQlh5rW/U1FZVdOcJJWvxsu4nZT+0e0qzXH1XFOVOjDcprnN05NzlFeL0XekjVZxLvoaHWtj+oztrkOGyqlhHSg+2pwk5Scm92zWktOb4aak86C80ni8FVw85uTw9Rbt3dqlUjeK8FvRnY1ucZfDbDLN/CSjUqUZdbBXs2ku3BrlKz0v8LsgWyW0lfZbE9fRjvJrcrUZdneinw14Si72fLVMkuL6ZBCst6UMrxkFKdSeHlzhUpzbXvgpJ+pqdoulai7UcvhKvWm92MnFqCk9FuxdpTl3KyXjyIjv0nbXYWvg6uEoVVVqSnGE1BOShGEt6d5Ws3eG7ZPi/AqOndr+HZ8uGquv479/mGweIybCRxNWrTpVZXcaEpfhJeDjzk3x7tb3NNhZQqT3Ku9GVtUrWXO+9fh5FiMq74DGzwFWFam2p05KcXfu4rytdPwLj2K23ntLi61OUaVGnGMXSjvfhZO7UuL7astbLS6KYdO6co9pXtd2Uud15tK/wDGnW+t07Wt2lpbWyenB39/mQfUIKEh0i5phaUaUK0ZbtkpzgpTkk3o3L2lw1tfx5l0bP55Qz6iqlKcZOy34rjCbWsZReq1v5hGzAAAAAAAAAAAAAAAAAAAAAAABpdscz/0Tgq1S9pOLhC3HrJ9mNvK9/0WUjQougk091rVPjG/muHl/mSrpyzacKlDDRnZbjqSj4tuMH6Ka9StMDmtXA6JqUfyWWHv2e4po+UcpNRhWwdTr8JJ0K3zoXW5O2vZfDxs9NeRs8Jjcv2pqdXjsN1GJ4OpC9OTlayuuDfDR35Wb1IzPaNONlR18X2b9/ea6Up41ucpXlx8bckvuLODe229pzp8+/iz6fRlgd67rV2uO7eKVr8LpX4aX79fAlGVbO0clo1IYKMaNacHFVpLfmpNJXbfK6TstL62ITsHtyqVsNjJXjwhVb4eE2/r9e8tGNNLW6SWt+VvF937x2eBAZ9HNeW9XxGPhKb1lPq5znJ8lvSkr+C4EdzbZGpgFvuEa8FxlGN2u/epybUo+XgWPmGOeKlp7K4ePi/Eycnw7xEt5+yvi+4go7H4SVeMZ0lG8L2tezfOz5PThLvNg8qhWipTbhNu9rqy7rLlxfqy1tpNnsDiain1e5UesnTk6d13SUdG/HieOC2ewk+xHD03fi5LelbvcndgU/mWAjho9nek9HwWtmuK4eBzlWZVcqksRh6zhLtR7KT05pp3jKOq46XXhcs3ajo/jSg54WWnOjN6P/hVOMfJ3RXuIyvqm4WlCabbjNbsl3+a8b2AnHRttvVxlevDHYpdvc6nfUYxUu1vxUkkldOGnh62bTxNOpOVOM4ucLb0U05R3kmrrirpp+8+YqzjRbhNOLbTcuEWlZcOf7+Bs8gzytkGJWIpay3XC002pRaXZduGsV6IYH0eCKbHbcUdpm6e5KlVjHelH2o2TSbjJeL4NIlSdyDkAAAAAAAAAAAAAAAAAAUZ03r/AFjD/l4f9yqV5Ys/pboLNMwjGm03TpRhN8oy3pyt46SXDvIgtl5v+tX6v7zUVmeHauje0ZiGiSPWDsbeWzdWHz4v1RjVMrq0/mp+TX22NdO3xm2nanlDxT61P4/f5/5k82K2oqV6fyKrO+7rBvi4rjC/hxt59xBeonS1cWvdoMLiJYSpGrH2oNPztxXvWnqYmJhheGX4Z42SivNvuX3khxNeGW09Fw0iu9/xr/CIdl3SFlWXUkutnKTSckqc2963C9racOJoc56SaOJm5QpVJJaR3rRVvV6hEtlWdR3bu38WSLK8L8khvS4tXb7lxsUtLpFr05J0qNJNcN7eqa+Sa1Pb+UWe59pHrnF8qdLcj+tu3+IyLUx2MeIlvPSK4X0072azFrLsfG2KqUmlpHtpVE++Li95EHw+xmbY7WpHd8atRN/Bt/A3WD6Mak9a2Lt4U43/AMTt9QyNZXyfKIVfwmYVKlJO6gqMlUf911LWt4pXNzldDZuvVjCEHGT0j1kqyTelu05cfNmyw/Rjl8fbdar5zsv8KX1mFtP0fZXg8NOpFyw8orsyUnO8uUN18bvTQCd08BRwjco06dPspOSjGPYitE5JcElzI1iOkLLKFTq+vcraOUYTlC/0ortLxVyrKWLzDOI08vjWnUjKSjGDl2O9bz5pLW2qVtORaGz3RzgcoprrqccXVa7UqiUoJ90IPRL4lyN5lmfYbNNKGJp1H+SpLf8AfB9pehs+tceK+wimZdHmWZgv9n6l99KTjZ96g7x+BrXslmeT64LMZVIr+qxC3k/Dee8l7lEgnyrrnoekZKXB3K1/l3iclqKjmWB3JWvv0mtY3tvKMpNNaPhP0Jdked4XPYuWHqqbWrjrGpH6UXrbx4eIwN6DAwmZRrV6mH+fShTqPucKrqKPvvTl6ozyAAAAAAA4ndLTV+hr6+LrYbWVONvBsDYmDnmYrKcPUrtX3I3S75NpRXvk0jEnnMnwgl5tsiXSPn8lhoUpRSVWortX0UO1+1uiGqRE2iJQupCri5yqyqb05tyk3zbd35LwPSNCouaZxRndGTGdj2UiH3q1rEMWrQqeHqYNbD1Y93qSOOWYjENKMV2r2e9Hio7+60m2pbuu7a/gYNbLMVZS6io09dItvjbVLhqnx7j06c1+vnbqaTw0m7UXL4nWdPf9qmn7k368TZxwdZ3fVT7Nr9l6Ny3EvPe7Nu88oyPR062fI1Jw65Hg8FKqo4ijJqTSTUpqz8k+BY2G2Qy7D2/ocb/34yk/SZXbaJvs10gywMI0sRGVSMdIzi1vpLgpJ6St38fM8m42nukFNX1ZI8JRwuG0p0qcPowite7Rae8zoYm3gu96W8z1wG0GCzb8XVhKT03JWUv1Zasyng6UpX6uPDlp9R8+azHaYd478MTrr876cF9abscdZbW9uV+PuZkSy+lLROS8FL6jrTy5PhNp+UdfPQyriNS/J+9296IBtpl2Z5viXGFF1KMbbm64RVmtZPel7V7osCGXtaqd9eabfrc9Y4SpDg4vxu19hRT1LZTNMO1KOFkpRd1JTgpJp3TW7PR3No620Ufm1fSnL47paUaFTw9f3HKo1H3eoFV7+0c+HWr9GkvrRw8n2ixmkq1SF++rGH7ErlrfJqj5r4/cc/I2+M/gBVNHo0xeNalisYr+c60rd15tWJTs3sdhNmqjrU5TnUcHT3pyVtyTjJpRikuMI+hLng4wV23px1srEXzTbHCUp9RgofL8T/u6NpRj41avswj7y9hjbPYz5dnONcdYU6NGk3y31KUrefakv0SZGi2SyF5LTnKct+viJ9dXfzetktYwX5EW2lfU3pkAAAAAA61IKqrNXT5HYAajGZSkm6d7/k/cyNZ5ldLNqTo1k13PhKMuTVyeHnVowrK0oqXmkwKBx+RY7Im93+kUlwcfaS8Y8V7rrxMalnkeE4uLLyxmzGExnGEl9Gc4/bYj+N6LsDi3frcRF+E4P9qDN11Jh3puL1jESryntLKKW7XmrKyTbaStbS97aO2nJintJWptNVlpqr06d0296TTcLpyerfGXO5MpdDuF5YzELzVF/wDrOtToaws9fluKXk6a+qB0jX+xDF9T9cofDaKut9Rrtb7cnZ7usva3bezfwMKNaK5on66HsOv7ZXfmqf3Hb+aDDfndf3Knf4xZ1rvJrxWHntp/r2gHWrvQ6xPmif8A8z+F/O8Q/PqfsgH0QYb88xC91L/4Nxv5+MdCPqv3NPmjbZdtNjMt/F15W/Jk9+NvJ8PcSj+aCgv7ZX98aX2JHWXRBT5Y6qvOnB/U0Lb2LdrVI0McS5y/pJaf4ein3ypv/wAJfeT3CYqOLhGrTe9GSUotc4vmVzU6H5fNzBrzoX+qqjMwWwmbZZBU6GcKEFe0XQulfja83Y8mpak+MYdaxMcysaM7x08z1jK3oV1LZfP+Wbwf/TUfqidZbL7QvRZxBL6MvsSObSyo3PHGY2lgouVWrCkuN5yjFerZWlbYPN8X+NzeXulWa/VUkjypdEO896pjt98/wOv60qrYEnzLpLyzBNxhUliJr5tGDlfyk7RfuZgZltbmWKivktChRvzqzc5pNcd2KUU/ez3y7o9w+CX42o/oqEL+kb/E3WH2bwtD5kpfSnJ/C9gIVh8urYqpGrjsVLGOLuqMklhr8r0lpK3FeKRYuDjFQTjTVO6V0klw0V7eB2o4anQ9mEY+SSPUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z',
    description: 'Công nghệ Boost hiện đại',
    inStock: true,
    featured: false
  },
  {
    id: 'adidas-9',
    name: 'Adidas Anthony Edwards 2',
    price: 3100000,
    priceFormatted: '3.100.000₫',
    category: 'Adidas',
    image: 'data:image/jpeg;base64,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',
    description: 'Bật cao hơn, bứt tốc nhanh hơn.',
    inStock: true,
    featured: false
  }
];

export const pumaProducts = [
  {
    id: 'puma-1',
    name: 'Puma Deviate NITRO 3',
    price: 3160000,
    priceFormatted: '3.160.000₫',
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/310195/01/sv01/fnd/VNM/fmt/png',
    description: 'Giày chạy bộ chuyên nghiệp',
    inStock: true,
    featured: true
  },
  {
    id: 'puma-2',
    name: 'Puma X-Cell Nova FS',
    price: 3210000,
    priceFormatted: '3.210.000₫',
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/379495/01/sv01/fnd/VNM/fmt/png',
    description: 'Thiết kế futuristic độc đáo',
    inStock: true,
    featured: false
  },
  {
    id: 'puma-3',
    name: 'Puma Turino II',
    price: 1210000,
    priceFormatted: '1.210.000₫',
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/397453/06/sv01/fnd/VNM/fmt/png',
    description: 'Giày thể thao da lộn cao cấp',
    inStock: true,
    featured: false
  },
  {
    id: 'puma-4',
    name: 'Puma Suede Classic',
    price: 1800000,
    priceFormatted: '1.800.000₫',
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/VNM/fmt/png',
    description: 'Biểu tượng văn hóa hip-hop',
    inStock: true,
    featured: true
  },
  {
    id: 'puma-5',
    name: 'Puma RS-X',
    price: 2500000,
    priceFormatted: '2.500.000₫',
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380462/01/sv01/fnd/VNM/fmt/png',
    description: 'Phong cách chunky sneaker',
    inStock: true,
    featured: true
  },
  {
    id: 'puma-6',
    name: 'Puma Cali Sport',
    price: 2200000,
    priceFormatted: '2.200.000₫',
    category: 'Puma',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRJMphY2tufwkNAnxoH6bO6gctIYwMFTzHCGHfyzGwLzSURamNWc3UJ4ILPs-JsyfEjAIeC9wUYeiA46mGtJOr65PNOnqtPkBtowZuzgL9nBop6_UUaKEc7eaWAiw87hMjiKBLfqQ&usqp=CAc',
    description: 'Phong cách California thoải mái',
    inStock: true,
    featured: false
  },
  {
    id: 'puma-7',
    name: 'Puma Mayze',
    price: 2400000,
    priceFormatted: '2.400.000₫',
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_500,h_500/global/401262/01/sv01/fnd/VNM/fmt/png',
    description: 'Đế platform nổi bật',
    inStock: true,
    featured: false
  },
  {
    id: 'puma-8',
    name: 'Puma Velocity NITRO 2',
    price: 2900000,
    priceFormatted: '2.900.000₫',
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/310195/01/sv01/fnd/VNM/fmt/png',
    description: 'Công nghệ NITRO êm ái',
    inStock: true,
    featured: false
  },
  {
    id: 'puma-8',
    name: 'Puma Giày chạy bộ nữ ForeverRun NITRO™ 2',
    price: 3650000,
    priceFormatted: '3.650.000₫',
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/VNM/fmt/png',
    description: 'Trải nghiệm khả năng nâng đỡ vượt trội với ForeverRun NITRO™ dành cho nữ.',
    inStock: true,
    featured: false
  }
];

export const nikeProducts = [
  {
    id: 'nike-1',
    name: 'Nike Air Max 90',
    price: 2500000,
    priceFormatted: '2.500.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-shoes-kRsBnD.png',
    description: 'Biểu tượng Air Max huyền thoại',
    inStock: true,
    featured: true
  },
  {
    id: 'nike-2',
    name: "Nike Air Force 1 '07",
    price: 3519000,
    priceFormatted: '3.519.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png',
    description: 'Giày bóng rổ kinh điển nhất',
    inStock: true,
    featured: true
  },
  {
    id: 'nike-3',
    name: 'Nike Zoom Vomero 5',
    price: 3999000,
    priceFormatted: '3.999.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/158136db-6a4c-48c2-adb5-30b688c038fa/zoom-vomero-5-se-shoes-pKn0hG.png',
    description: 'Giày chạy bộ cao cấp',
    inStock: true,
    featured: false
  },
  {
    id: 'nike-4',
    name: 'Nike Dunk Low Retro',
    price: 2929000,
    priceFormatted: '2.929.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-retro-shoes-66RGqF.png',
    description: 'Phong cách skateboard cổ điển',
    inStock: true,
    featured: true
  },
  {
    id: 'nike-5',
    name: 'Nike Pegasus 40',
    price: 3239000,
    priceFormatted: '3.239.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/1abaae51-d7c4-4ca6-8e2b-8133b90d168b/AIR+ZOOM+PEGASUS+40.png',
    description: 'Giày chạy bộ đa năng',
    inStock: true,
    featured: false
  },
  {
    id: 'nike-6',
    name: 'Nike Cortez',
    price: 2199000,
    priceFormatted: '2.199.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/af0c0ab0-62eb-4037-8b90-785f2a7de60d/NIKE+CORTEZ.png',
    description: 'Thiết kế retro vượt thời gian',
    inStock: true,
    featured: false
  },
  {
    id: 'nike-7',
    name: "Nike Blazer Mid '77",
    price: 2869000,
    priceFormatted: '2.869.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/389b709e-5102-4e55-aa5d-07099b500831/BLAZER+MID+%2777+VNTG.png',
    description: 'Phong cách vintage cao cổ',
    inStock: true,
    featured: false
  },
  {
    id: 'nike-8',
    name: 'Nike React Infinity Run',
    price: 3669000,
    priceFormatted: '3.669.000₫',
    category: 'Nike',
    image: 'https://giaygiare.vn/upload/sanpham/large/nike-react-infinity-run-flyknit-4-core-black.jpg',
    description: 'Công nghệ React êm ái',
    inStock: true,
    featured: false
  },
  {
    id: 'nike-9',
    name: 'Nike Vomero 18',
    price: 4200000,
    priceFormatted: '4.200.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a3e5c9df-cf3e-4cc8-b1dd-16ce5ec25751/NIKE+VOMERO+18.png',
    description: 'Tôi thích Vomero 18 vì lớp đệm êm ái',
    inStock: true,
    featured: false 
  },
  {
    id: 'nike-10',
    name: 'Nike Air Jordan 1 Low',
    price: 3200000,
    priceFormatted: '3.200.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f359f330-b2f1-4875-9cb2-0820339dae6d/AIR+JORDAN+1+LOW+SE.png',
    description: 'Huyền thoại bóng rổ phiên bản thấp cổ',
    inStock: true,
    featured: true
  },
  {
    id: 'nike-11',
    name: 'Nike Air Max 97',
    price: 4500000,
    priceFormatted: '4.500.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/6a3671b8-f115-44f6-9ab6-3798d55210eb/custom-nike-air-max-97-shoes-by-you.png',
    description: 'Thiết kế lượn sóng độc đáo',
    inStock: true,
    featured: true
  },
  {
    id: 'nike-12',
    name: 'Nike Zoom Fly 5',
    price: 3800000,
    priceFormatted: '3.800.000₫',
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/ee18eb38-d735-4ce0-a3ac-6ca94f750027/ZOOM+FLY+5.png',
    description: 'Giày chạy bộ tốc độ cao',
    inStock: true,
    featured: true
  }

];

// Sản phẩm sale
export const saleProducts = [
  {
    id: 'sale-1',
    name: 'Adidas Ultraboost 20',
    originalPrice: 2500000,
    salePrice: 750000,
    originalPriceFormatted: '2.500.000₫',
    salePriceFormatted: '750.000₫',
    discount: 30,
    category: 'Adidas',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9rh8WThnPS_Z0WZHNhmR1lko5Hbxu-fYUuNtQ2DOV59a6Y845FSoHqCzUCZMF92jmJZOZPvzrFPZFgnvFSWb1JCwtu44StMODJw-aLd8HmyhWxwzaXs1gz424dVRDn6FclPgPuw&usqp=CAc',
    inStock: true
  },
  {
    id: 'sale-2',
    name: 'Nike Air Max 90',
    originalPrice: 2500000,
    salePrice: 875000,
    originalPriceFormatted: '2.500.000₫',
    salePriceFormatted: '875.000₫',
    discount: 25,
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-shoes-kRsBnD.png',
    inStock: true
  },
  {
    id: 'sale-3',
    name: 'Puma Suede Classic',
    originalPrice: 1800000,
    salePrice: 460000,
    originalPriceFormatted: '1.800.000₫',
    salePriceFormatted: '460.000₫',
    discount: 30,
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/VNM/fmt/png',
    inStock: true
  },
  {
    id: 'sale-4',
    name: 'Adidas Stan Smith',
    originalPrice: 2400000,
    salePrice: 580000,
    originalPriceFormatted: '2.400.000₫',
    salePriceFormatted: '580.000₫',
    discount: 30,
    category: 'Adidas',
    image: 'data:image/jpeg;base64,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',
    inStock: true
  },
  {
    id: 'sale-5',
    name: 'Nike Dunk Low Retro',
    originalPrice: 2929000,
    salePrice: 750000,
    originalPriceFormatted: '2.929.000₫',
    salePriceFormatted: '750.000₫',
    discount: 30,
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-retro-shoes-66RGqF.png',
    inStock: true
  },
  {
    id: 'sale-6',
    name: 'Puma RS-X',
    originalPrice: 2500000,
    salePrice: 750000,
    originalPriceFormatted: '2.500.000₫',
    salePriceFormatted: '750.000₫',
    discount: 30,
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380462/01/sv01/fnd/VNM/fmt/png',
    inStock: true
  },
  {
    id: 'sale-7',
    name: 'Adidas Gazelle',
    originalPrice: 2300000,
    salePrice: 610000,
    originalPriceFormatted: '2.300.000₫',
    salePriceFormatted: '610.000₫',
    discount: 30,
    category: 'Adidas',
    image: 'data:image/webp;base64,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',
    inStock: true
  },
  {
    id: 'sale-8',
    name: 'Nike Blazer Mid 77',
    originalPrice: 2869000,
    salePrice: 908000,
    originalPriceFormatted: '2.869.000₫',
    salePriceFormatted: '908.000₫',
    discount: 30,
    category: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/389b709e-5102-4e55-aa5d-07099b500831/blazer-mid-77-vintage-shoes-nw30B2.png',
    inStock: true
  },
  {
    id: 'sale-9',
    name: 'Puma Mayze',
    originalPrice: 2400000,
    salePrice: 680000,
    originalPriceFormatted: '2.400.000₫',
    salePriceFormatted: '680.000₫',
    discount: 30,
    category: 'Puma',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_500,h_500/global/381983/52/sv01/fnd/VNM/fmt/png/Gi%C3%A0y-th%E1%BB%83-thao-n%E1%BB%AF-Mayze',
    inStock: true
  }
];

// Lấy tất cả sản phẩm
export const allProducts = [...adidasProducts, ...pumaProducts, ...nikeProducts];

// Lấy sản phẩm nổi bật
export const getFeaturedProducts = () => {
  return allProducts.filter(product => product.featured);
};

// Lấy sản phẩm theo category
export const getProductsByCategory = (category) => {
  return allProducts.filter(product => product.category === category);
};

// Lấy sản phẩm theo ID
export const getProductById = (id) => {
  return allProducts.find(product => product.id === id);
};

// Tìm kiếm sản phẩm
export const searchProducts = (query) => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};