export interface Products {
    code: string
    message: string
    responseCode: number
    total: number
    data: Daum[]
    total_geral: string
  }
  
  export interface Daum {
    id: string
    is_simple: string
    parent_id: string
    cod: string
    digital: string
    produto: string
    produto_url: string
    video: string
    url_download: string
    link_externo: string
    caracteristicas: string
    descricao: string
    especificacoes: string
    itens_inclusos: string
    garantia: string
    peso: string
    comprimento: string
    largura: string
    altura: string
    valor_promo: string
    data_promo_de: string
    data_promo: string
    multiplo: string
    equivalencia: Equivalencia
    equivalencia_tamanho: string
    equivalencia_cor: string
    equivalencia_fundo: string
    ativo: string
    venda: string
    oculto: string
    frete_gratis: string
    palavras_substitutas: string
    prazo_producao: string
    categorias_adicionais: string
    foto: string
    tipo_fotos: string
    ncm: string
    mpn: string
    gtin: string
    genero: Genero
    modelagem: Modelagem
    grupo_etario: GrupoEtario
    marca: Marca
    atributos: string
    tabela_preco: TabelaPreco
    campos_adicionais: string
    curtidas: string
    quantidade_total_em_estoque: string
    grade_tipo: string
    selos: string
    relacionados: string
    campo_anotacao: string
    valor_unidade_tipo: string
    owner_id: string
    created: string
    updated: string
    estoque_cor_id: string
    estoque_id: string
    tabela_medidas: TabelaMedidas
    permite_embalagem: string
    permite_arquivo: string
    permite_recorrencia: string
    valores_base: any[]
    seo_title: string
    seo_description: string
    seo_metatags: string
    seo_scripts: string
    seo_banner: SeoBanner
    nome_cor: string
    formato_cor: string
    termo_agrupador: string
    total_comentarios: string
    comentarios_media: string
    marketplace_has_outros_anuncios: string
    campos_adicionais_raw: string
    categoria_level1: CategoriaLevel1
    categoria_level2: CategoriaLevel2
    categoria_level3: CategoriaLevel3
    google_category: string
    site_category: string
    embalagem: Embalagem
    combo: any[]
    personalizador: any[]
    isPromo: string
    cat_add: string
    biquini: any[]
    produto_online: string
    adicional_info: any[]
    url_relative: string
    url_absolute: string
    isChild: string
    is_schedule: string
    estoque: Estoque[]
    quantidade_total_variacoes: string
    fotos: Foto2[]
    quantidade_total_visualizacoes: string
    loja: Loja
  }
  
  export interface Equivalencia {
    id: string
    tipo: string
    qtd: string
    tamanho: string
    cor: string
    fundo: string
  }
  
  export interface Genero {
    tipo: string
    nome: string
  }
  
  export interface Modelagem {
    tipo: string
    nome: string
  }
  
  export interface GrupoEtario {
    tipo: string
    nome: string
  }
  
  export interface Marca {
    id: string
    nome: string
    url: string
  }
  
  export interface TabelaPreco {
    id: string
    tabela: string
  }
  
  export interface TabelaMedidas {
    id: string
    tipo: string
    titulo: string
    imagem: string
  }
  
  export interface SeoBanner {
    banner: string
    banner_mobile: string
    link: string
    folder: string
  }
  
  export interface CategoriaLevel1 {
    id: string
    nome: string
    url: string
    tabela: string
    google_category: string
  }
  
  export interface CategoriaLevel2 {
    id: string
    nome: string
    url: string
    google_category: string
  }
  
  export interface CategoriaLevel3 {
    id: string
    nome: string
    url: string
    google_category: string
  }
  
  export interface Embalagem {
    id: string
    sigla: string
    nome: string
  }
  
  export interface Estoque {
    id: string
    sku: string
    cod_estoque: string
    peso: string
    comprimento: string
    largura: string
    altura: string
    visualizacoes: string
    ativo: string
    variacao_posicao: string
    preco_custo: string
    qtd_maxima: string
    gtin: string
    atributos: any[]
    reserva: any[]
    erp_id: string
    prazo_producao: string
    quantidade_em_estoque: string
    cor: Cor
    variacao: Variacao
    adicional_info: any[]
    valores: Valore[]
    fotos: Foto[]
  }
  
  export interface Cor {
    id: string
    nome: string
    primaria: string
    secundaria: string
    img: string
    ativo: string
    posicao: string
    nome_simples: string
  }
  
  export interface Variacao {
    id: string
    variacao_id: string
    nome: string
    valor: string
    posicao: string
    ativo: string
  }
  
  export interface Valore {
    tabela_id: string
    tabela_nome: string
    quantidade_minima: string
    valor: string
    valor_promo: string
    data_promo_de: string
    data_promo: string
    codigo: string
    valor_comparativo: string
    isPromo: string
    valor_loja: any[]
  }
  
  export interface Foto {
    cor_id: string
    codigo: string
    foto: string
    legenda: string
    oculto: string
    video: string
    foto_mini: string
  }
  
  export interface Foto2 {
    cor_id: string
    codigo: string
    foto: string
    legenda: string
    oculto: string
    video: string
    foto_mini: string
  }
  
  export interface Loja {
    id: string
    identificacao: string
    cidade: string
    uf: string
    multiloja: string
    multicd: string
    nome: string
    cep_origem: string
    url: string
    url_interna_matriz: string
    logo: string
    isFilial: string
  }
  