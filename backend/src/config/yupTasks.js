import * as yup from 'yup'


export const taskChema = yup.object({
    titulo: yup.string().required("Não pode haver campos vazios").trim(),
    descricao: yup.string().required("Preencha a descricao por favor").trim(),
    user_id: yup.number().required("Não pode haver campos vazios")
})