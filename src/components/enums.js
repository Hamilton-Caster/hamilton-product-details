import {Enumeration} from '@/utilities/enums'

const AttributeTypes = new Enumeration({
  Rating: 'Image',
  String: 'Text'
})

const ProductTypes = new Enumeration({
  Casters: 0,
  Wheels: 1
})

export {
  AttributeTypes,
  ProductTypes,
}
