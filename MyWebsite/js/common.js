class Common{
    static stringToAsciiString(str){
        try {
            return str.replaceAll(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
              .replaceAll(/[èéẻẽẹêềếểễệ]/g, 'e')
              .replaceAll(/[đ]/g, 'd')
              .replaceAll(/[ìíỉĩị]/g, 'i')
              .replaceAll(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
              .replaceAll(/[ùúủũụưừứửữự]/g, 'u')
              .replaceAll(/[ỳýỷỹỵ]/g, 'y')
          } catch {
            return ''
          }
    }
}