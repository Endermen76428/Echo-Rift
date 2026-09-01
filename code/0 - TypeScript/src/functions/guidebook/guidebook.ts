import { guidebookInfo, GuidebookPages } from "./guidebookPages"
import { ActionFormData } from "@minecraft/server-ui"
import { Player } from "@minecraft/server"

const addonId = "echo_rift"
const translateId = `ui.${addonId}:guidebook.`

export const guidebook = new class Guidebook {
  open(player: Player, directory: number[]): void {
    const dir = [...directory]
    const { currentForm, titlePath } = this.getDirectory(dir)
    const identifier = dir.join(".")
    const titleId = titlePath.join(".")
    const buttons = currentForm.buttons?.map((obj, index) => obj)

    const title = translateId + "title." + titleId + (currentForm.title == undefined ? ((!identifier ? "0" : ".") + identifier) : (titlePath.length > 0 ? "." : "") + currentForm.title)

    const form = new ActionFormData()
    .title(title)
    if(currentForm.body != false) form.body(translateId + "body." + titleId + (titlePath.length > 0 ? "." : "") + (currentForm.body ?? currentForm.title))
    if(currentForm.header) form.header(translateId + "header." + titleId + (titlePath.length > 0 ? "." : "") + currentForm.header)
    if(currentForm.labelB) form.label(translateId + "label." + titleId + (titlePath.length > 0 ? "." : "") + currentForm.labelB)

    buttons?.forEach((button, index) => {
      if(button.dividerB) form.divider()
      if(button.labelB) form.label(translateId + "label." + button.labelB)
      if(button.title){
        const texturePath = `textures/${addonId}/ui/guidebook/` + titleId.replaceAll(".", "/") + (titlePath.length > 0 ? "/" : "") + currentForm.title + "/" + (button.path ?? `${index}`)
        form.button(title + "." + button.title, typeof button.path == "boolean" ? undefined : button.path?.startsWith("C:") ? button.path.replace("C:", "") : texturePath)
      } else if(button.directory) {
        const dir2 = [...button.directory]
        const { currentForm: curForm2, titlePath: titlePath2 } = this.getDirectory(dir2)
        const titleId2 = titlePath2.join(".")
        const title2 = translateId + "title." + titleId2 + (curForm2.title == undefined ? ((!identifier ? "0" : ".") + identifier) : (titlePath2.length > 0 ? "." : "") + curForm2.title)
        const texturePath = `textures/${addonId}/ui/guidebook/` + titleId2.replaceAll(".", "/") + (titlePath2.length > 0 ? "/" : "") + (curForm2.path ?? `${index}`)
        form.button(title2, typeof curForm2.path == "boolean" ? undefined : curForm2.path?.startsWith("C:") ? curForm2.path.replace("C:", "") : texturePath)
      }
      if(button.labelA) form.label(translateId + "label." + button.labelA)
      if(button.dividerA) form.divider()
    })

    if(currentForm.labelA) form.label(translateId + "label." + titleId + (titlePath.length > 0 ? "." : "") + currentForm.labelA)

    if(dir.length > 0) form.button("ui.bedrock_awakening:guidebook.return", `textures/${addonId}/ui/guidebook/return`)

    form.show(player).then(({canceled, selection}) => {
      if(canceled || selection == undefined) return

      if(selection == (buttons?.length ?? 0)){
        dir.pop()
        return this.open(player, dir)
      }

      const selected = buttons?.[selection]

      if(!selected || !selected.directory){
        dir.push(selection)
        return this.open(player, dir)
      }

      this.open(player, [...selected.directory])
    })
  }

  private getDirectory(indexArray: number[]): {currentForm: GuidebookPages, titlePath: string[]} {
    let current: GuidebookPages = {...guidebookInfo}
    const path: string[] = []
    if(indexArray.length > 0) for(const index of indexArray){
      const cur = current.buttons?.[index]
      if(!cur) return {currentForm: current, titlePath: path}
      path.push(current.title ?? `${index}`)
      current = cur
    }
    return {currentForm: current, titlePath: path}
  }
}